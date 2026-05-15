import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { Value } from "typebox/value";
import { characterCreationDraftSchema } from "../dist/src/character/interaction.js";

const characterCreationDraftToolSchema = Type.Object({
	draft: Type.Any({ description: "Character creation draft payload to validate." }),
});

export default function characterExtension(pi: ExtensionAPI) {
	pi.registerTool({
		name: "validate_character_creation_draft",
		label: "Validate Character Draft",
		description: "Validate a pi-fiction character creation draft before generating character record files.",
		promptSnippet: "Validate pi-fiction character creation draft payloads before writing character files.",
		parameters: characterCreationDraftToolSchema,
		async execute(_toolCallId, params) {
			const valid = Value.Check(characterCreationDraftSchema, params.draft);

			if (!valid) {
				const errors = [...Value.Errors(characterCreationDraftSchema, params.draft)].map((error) => ({
					path: error.path,
					message: error.message,
				}));

				return {
					isError: true,
					content: [{ type: "text", text: JSON.stringify({ valid: false, errors }, null, 2) }],
					details: { valid: false, errors },
				};
			}

			return {
				content: [{ type: "text", text: JSON.stringify({ valid: true, draft: params.draft }, null, 2) }],
				details: { valid: true, draft: params.draft },
			};
		},
	});

	pi.registerCommand("character-create", {
		description: "Start a guided pi-fiction character creation flow",
		handler: async (args, ctx) => {
			const role = await ctx.ui.select("What kind of character are we making?", [
				"protagonist",
				"antagonist",
				"ally",
				"love-interest",
				"mentor",
				"foil",
				"wildcard",
				"ensemble",
				"unknown",
			]);
			if (!role) return;

			const storyMode = await ctx.ui.select("Which story lens should guide development?", [
				"general",
				"comedy",
				"mystery",
				"romance",
				"horror",
				"adventure",
				"fantasy",
				"sci-fi",
				"literary",
				"custom",
			]);
			if (!storyMode) return;

			const focus = await ctx.ui.select("What should we discover first?", [
				"desire",
				"wound",
				"voice",
				"relationship",
				"contradiction",
				"scene-test",
				"unknown",
			]);
			if (!focus) return;

			pi.sendUserMessage(`Use the character-development skill to develop this character.

Starting point: ${args.trim() || "new character"}
Role: ${role}
Story mode: ${storyMode}
First focus: ${focus}

Use pressure probes and voice audition before drafting files. When you have a character creation draft payload, call validate_character_creation_draft before writing character records.`);
		},
	});
}
