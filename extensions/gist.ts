import { complete, type UserMessage } from "@earendil-works/pi-ai";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { BorderedLoader } from "@earendil-works/pi-coding-agent";
import { Value } from "typebox/value";
import {
    GistOptionCard,
    GistPromptEditor,
    gistOptionSetSchema,
    type GistOption,
    type GistOptionAction,
    type GistOptionKind,
    type GistOptionSet,
} from "../dist/src/gist/index.js";

const KINDS: GistOptionKind[] = ["story", "character", "world", "style", "scene", "review", "custom"];

const SYSTEM_PROMPT = `You help fiction writers explore one gist at a time.

Return only JSON matching this shape:
{
  "kind": "story|character|world|style|scene|review|custom",
  "gist": "short restatement of the user's gist",
  "options": [
    {
      "id": "short-id",
      "title": "short handle, max 7 words",
      "summary": "1-2 compact sentences",
      "reasonLabel": "contextual section label, 1-4 words",
      "whyAlive": "1 compact sentence explaining story energy",
      "detailLabel": "contextual section label, 1-4 words",
      "detail": "one vivid detail, example, or question"
    }
  ],
  "note": "optional"
}

Rules:
- Generate 3 to 5 options.
- Keep each option easy to grasp quickly.
- Do not write an essay, menu, canon document, or file plan.
- Make options meaningfully different from each other.
- Prefer motion, pressure, voice, conflict, play, and reader curiosity.
- Choose section labels that fit the kind of work. Avoid generic labels when a sharper one fits.
- Examples: story = "Story engine" / "Opening image"; character = "Pressure" / "Tells"; world = "Friction" / "Texture"; scene = "Turn" / "Moment".
- Treat skipped ideas as scratch, not canon.`;

function fallbackOptions(kind: GistOptionKind, gist: string): GistOptionSet {
    return {
        kind,
        gist,
        options: [
            {
                id: "pressure",
                title: "Put it under pressure",
                summary: `Take the gist (${gist}) and reveal it through a moment where someone cannot get what they want cleanly.`,
                reasonLabel: "Story engine",
                whyAlive: "Pressure turns premise into behavior, choice, and scene momentum.",
                detailLabel: "Question",
                detail: "What would make the obvious move impossible or costly?",
            },
            {
                id: "contradiction",
                title: "Find the contradiction",
                summary: "Look for the appealing conflict inside the idea: the want that fights the value, role, or self-image.",
                reasonLabel: "Friction",
                whyAlive: "Contradiction gives the writer something active to play instead of a static trait.",
                detailLabel: "Test",
                detail: "Name what this person/place/story claims to be, then what keeps disproving it.",
            },
            {
                id: "delight",
                title: "Chase the delight",
                summary: "Choose the version that would be most fun to draft for ten minutes right now.",
                reasonLabel: "Pull",
                whyAlive: "Energy on the page often starts with the writer wanting to see what happens next.",
                detailLabel: "Spark",
                detail: "What detail makes you grin, wince, or lean forward?",
            },
        ],
    };
}

function extractJson(text: string): unknown {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const raw = fenced?.[1] ?? text;
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
        throw new Error("No JSON object found in model response.");
    }
    return JSON.parse(raw.slice(start, end + 1));
}

async function generateOptions(
    ctx: Parameters<Parameters<ExtensionAPI["registerCommand"]>[1]["handler"]>[1],
    kind: GistOptionKind,
    gist: string,
    instruction?: string,
): Promise<GistOptionSet> {
    if (!ctx.model) {
        return fallbackOptions(kind, gist);
    }

    const result = await ctx.ui.custom<GistOptionSet | null>((tui, theme, _keybindings, done) => {
        const loader = new BorderedLoader(tui, theme, `Finding ${kind} options...`);
        loader.onAbort = () => done(null);

        const run = async () => {
            const auth = await ctx.modelRegistry.getApiKeyAndHeaders(ctx.model!);
            if (!auth.ok || !auth.apiKey) {
                return fallbackOptions(kind, gist);
            }

            const userMessage: UserMessage = {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `Kind: ${kind}\nGist: ${gist}\n${instruction ? `Additional instruction: ${instruction}` : ""}`,
                    },
                ],
                timestamp: Date.now(),
            };

            const response = await complete(
                ctx.model!,
                { systemPrompt: SYSTEM_PROMPT, messages: [userMessage] },
                { apiKey: auth.apiKey, headers: auth.headers, signal: loader.signal },
            );

            if (response.stopReason === "aborted") {
                return null;
            }

            const text = response.content
                .filter((part): part is { type: "text"; text: string } => part.type === "text")
                .map((part) => part.text)
                .join("\n");
            const parsed = extractJson(text);

            if (!Value.Check(gistOptionSetSchema, parsed)) {
                return fallbackOptions(kind, gist);
            }

            return parsed;
        };

        run()
            .then(done)
            .catch(() => done(fallbackOptions(kind, gist)));

        return loader;
    });

    return result ?? fallbackOptions(kind, gist);
}

async function promptForGist(
    ctx: Parameters<Parameters<ExtensionAPI["registerCommand"]>[1]["handler"]>[1],
    kind: GistOptionKind,
): Promise<string | undefined> {
    return ctx.ui.custom<string | undefined>((tui, theme, keybindings, done) => {
        const editor = new GistPromptEditor(tui, theme, keybindings, {
            kind,
            onSubmit: done,
        });

        return {
            render: (width: number) => editor.render(width),
            invalidate: () => editor.invalidate(),
            handleInput: (data: string) => {
                editor.handleInput(data);
                tui.requestRender();
            },
            get focused() {
                return editor.focused;
            },
            set focused(value: boolean) {
                editor.focused = value;
            },
        };
    });
}

function formatChosenOption(kind: GistOptionKind, gist: string, option: GistOption): string {
    return `Continue the ${kind} flow using this gist.

Gist: ${gist}
Option: ${option.title}
Summary: ${option.summary}
Why it might be alive: ${option.whyAlive}
${option.detail ? `Spark: ${option.detail}\n` : ""}
Move forward with this direction, but keep the next response option-sized. Do not dump a long menu.`;
}

export default function gistOptionExtension(pi: ExtensionAPI) {
    pi.registerCommand("gist", {
        description: "Explore a fiction idea one compact gist at a time",
        handler: async (args, ctx) => {
            if (!ctx.hasUI) {
                ctx.ui.notify("gist requires interactive mode", "error");
                return;
            }

            const selectedKind = await ctx.ui.select("What kind of option-sized flow?", KINDS);
            if (!selectedKind) return;
            const kind = selectedKind as GistOptionKind;

            const gist = args.trim() || (await promptForGist(ctx, kind));
            if (!gist) return;

            let optionSet = await generateOptions(ctx, kind, gist);
            let index = 0;

            while (true) {
                const option = optionSet.options[index];
                if (!option) return;

                let inlineInput: string | undefined;
                const action = await ctx.ui.custom<GistOptionAction>((tui, theme, _keybindings, done) => {
                    const card = new GistOptionCard(theme, {
                        kind,
                        option,
                        index,
                        total: optionSet.options.length,
                        onAction: done,
                        onInput: (input) => {
                            inlineInput = input;
                            done("add_input");
                        },
                    });

                    return {
                        render: (width: number) => card.render(width),
                        invalidate: () => card.invalidate(),
                        handleInput: (data: string) => {
                            card.handleInput(data);
                            tui.requestRender();
                        },
                    };
                });

                if (action === "continue") {
                    pi.sendUserMessage(formatChosenOption(kind, gist, option));
                    return;
                }

                if (action === "next") {
                    index = (index + 1) % optionSet.options.length;
                    continue;
                }

                if (action === "add_input") {
                    const note = inlineInput?.trim();
                    if (!note) continue;
                    optionSet = await generateOptions(ctx, kind, `${gist}\n\nAdditional input: ${note}`);
                    index = 0;
                    continue;
                }

                ctx.ui.notify("Gist flow stopped", "info");
                return;
            }
        },
    });
}
