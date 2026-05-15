import type { KeybindingsManager, Theme } from "@earendil-works/pi-coding-agent";
import { CustomEditor, DynamicBorder } from "@earendil-works/pi-coding-agent";
import {
    type Component,
    Container,
    type Focusable,
    Input,
    Key,
    matchesKey,
    type SelectItem,
    SelectList,
    type SelectListTheme,
    Spacer,
    Text,
    type TUI,
} from "@earendil-works/pi-tui";
import type { GistOption, GistOptionAction, GistOptionKind } from "./schemas.js";

export interface GistOptionCardOptions {
    kind: GistOptionKind;
    option: GistOption;
    index: number;
    total: number;
    onAction: (action: GistOptionAction) => void;
    onInput?: (input: string) => void;
}

const ACTIONS: Array<SelectItem & { value: GistOptionAction }> = [
    { value: "next", label: "Next", description: "Keep this private and show another option" },
    { value: "continue", label: "Select", description: "Use this option as the next creative move" },
];

function border(theme: Theme, text: string): string {
    return theme.fg("border", text);
}

function muted(theme: Theme, text: string): string {
    return theme.fg("muted", text);
}

function createSelectListTheme(theme: Theme): SelectListTheme {
    return {
        selectedPrefix: (text: string) => theme.fg("accent", text),
        selectedText: (text: string) => theme.fg("accent", text),
        description: (text: string) => theme.fg("muted", text),
        scrollInfo: (text: string) => theme.fg("dim", text),
        noMatch: (text: string) => theme.fg("warning", text),
    };
}

function getGistTitle(kind: GistOptionKind): string {
    const titles: Record<GistOptionKind, string> = {
        story: "Story gist",
        character: "Character gist",
        world: "World gist",
        style: "Style gist",
        scene: "Scene gist",
        review: "Review gist",
        custom: "Gist",
    };
    return titles[kind];
}

const ESCAPE_CHARACTER = String.fromCharCode(27);

function stripAnsiColorCodes(line: string): string {
    let plain = "";
    let index = 0;

    while (index < line.length) {
        if (line[index] === ESCAPE_CHARACTER && line[index + 1] === "[") {
            const end = line.indexOf("m", index + 2);
            if (end !== -1) {
                index = end + 1;
                continue;
            }
        }

        plain += line[index];
        index += 1;
    }

    return plain;
}

function isEditorBorderLine(line: string): boolean {
    const plain = stripAnsiColorCodes(line);
    return /^─+$/.test(plain) || /^─── [↑↓] \d+ more ─*$/.test(plain);
}

class BorderlessEditor extends CustomEditor {
    render(width: number): string[] {
        return super.render(width).filter((line) => !isEditorBorderLine(line));
    }
}

export interface GistPromptEditorOptions {
    kind: GistOptionKind;
    onSubmit: (gist: string | undefined) => void;
}

export class GistPromptEditor implements Component, Focusable {
    private readonly editor: BorderlessEditor;
    private readonly container: Container = new Container();
    private _focused = false;

    constructor(tui: TUI, theme: Theme, keybindings: KeybindingsManager, options: GistPromptEditorOptions) {
        this.editor = new BorderlessEditor(
            tui,
            {
                borderColor: (text: string) => border(theme, text),
                selectList: createSelectListTheme(theme),
            },
            keybindings,
        );
        this.editor.onSubmit = (value) => options.onSubmit(value.trim() || undefined);

        this.container.addChild(new DynamicBorder((text: string) => border(theme, text)));
        this.container.addChild(new Text(muted(theme, getGistTitle(options.kind)), 1, 0));
        this.container.addChild(new Spacer(1));
        this.container.addChild(this.editor);
        this.container.addChild(new DynamicBorder((text: string) => border(theme, text)));
    }

    render(width: number): string[] {
        return this.container.render(width);
    }

    handleInput(data: string): void {
        if (matchesKey(data, Key.ctrl("c"))) {
            this.editor.onSubmit?.("");
            return;
        }
        this.editor.handleInput(data);
    }

    get focused(): boolean {
        return this._focused;
    }

    set focused(value: boolean) {
        this._focused = value;
        this.editor.focused = value;
    }

    invalidate(): void {
        this.container.invalidate();
    }
}

export class GistOptionCard implements Component, Focusable {
    private readonly theme: Theme;
    private readonly onAction: (action: GistOptionAction) => void;
    private readonly onInput?: (input: string) => void;
    private kind: GistOptionKind;
    private option: GistOption;
    private index: number;
    private total: number;
    private top: Container = new Container();
    private bottom: Container = new Container();
    private actions: SelectList;
    private input: Input = new Input();
    private _focused = false;

    constructor(theme: Theme, options: GistOptionCardOptions) {
        this.theme = theme;
        this.kind = options.kind;
        this.option = options.option;
        this.index = options.index;
        this.total = options.total;
        this.onAction = options.onAction;
        this.onInput = options.onInput;
        this.input.onSubmit = (value) => {
            const trimmed = value.trim();
            if (!trimmed) return;
            this.input.setValue("");
            this.onInput?.(trimmed);
        };
        this.input.onEscape = () => {
            this.input.setValue("");
        };
        this.actions = this.createActionList();
        this.rebuild();
    }

    setOption(option: GistOption, index: number, total: number): void {
        this.option = option;
        this.index = index;
        this.total = total;
        this.rebuild();
    }

    setKind(kind: GistOptionKind): void {
        this.kind = kind;
        this.rebuild();
    }

    render(width: number): string[] {
        return [...this.top.render(width), ...this.bottom.render(width)];
    }

    handleInput(data: string): void {
        if (matchesKey(data, Key.ctrl("c"))) {
            this.onAction("stop");
            return;
        }

        if (matchesKey(data, Key.up) || matchesKey(data, Key.down)) {
            this.actions.handleInput(data);
            return;
        }

        if (matchesKey(data, Key.enter) && this.input.getValue().trim() === "") {
            this.actions.handleInput(data);
            return;
        }

        this.input.handleInput(data);
    }

    get focused(): boolean {
        return this._focused;
    }

    set focused(value: boolean) {
        this._focused = value;
        this.syncFocus();
    }

    invalidate(): void {
        this.top.invalidate();
        this.bottom.invalidate();
    }

    private createActionList(): SelectList {
        const selectList = new SelectList(ACTIONS, ACTIONS.length, createSelectListTheme(this.theme));

        selectList.onSelect = (item) => {
            this.onAction(item.value as GistOptionAction);
        };
        return selectList;
    }

    private rebuild(): void {
        const top = new Container();
        top.addChild(new DynamicBorder((text: string) => border(this.theme, text)));
        top.addChild(
            new Text(
                this.theme.bold(this.option.title) +
                    this.theme.fg("dim", `  ${this.kind} option ${this.index + 1}/${this.total}`),
                1,
                0,
            ),
        );
        top.addChild(new Spacer(1));
        top.addChild(new Text(this.option.summary, 1, 0));
        top.addChild(new Spacer(1));
        top.addChild(new Text(muted(this.theme, this.option.reasonLabel ?? "Why it might be alive"), 1, 0));
        top.addChild(new Text(this.option.whyAlive, 1, 0));

        if (this.option.detail) {
            top.addChild(new Spacer(1));
            top.addChild(new Text(muted(this.theme, this.option.detailLabel ?? "Spark"), 1, 0));
            top.addChild(new Text(this.option.detail, 1, 0));
        }

        top.addChild(new Spacer(1));

        const bottom = new Container();
        bottom.addChild(this.actions);
        bottom.addChild(new Spacer(1));
        bottom.addChild(this.input);
        bottom.addChild(new DynamicBorder((text: string) => border(this.theme, text)));

        this.top = top;
        this.bottom = bottom;
        this.syncFocus();
    }

    private syncFocus(): void {
        this.input.focused = this._focused;
    }
}
