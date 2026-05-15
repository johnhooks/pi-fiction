import { Value } from "typebox/value";
import { describe, expect, it } from "vitest";
import {
    characterDevelopmentEventSchema,
    characterProfileSchema,
    characterReferenceEntrySchema,
    characterVoiceSchema,
} from "../src/index.js";

describe("character schemas", () => {
    it("validates a character profile", () => {
        const profile = {
            name: "Harper Quinn",
            slug: "harper-quinn",
            summary: "A defensive investigator who wants control but needs trust.",
            contradictions: ["Craves connection but treats help as weakness."],
            pressurePoints: ["Being forced to depend on someone she doubts."],
        };

        expect(Value.Check(characterProfileSchema, profile)).toBe(true);
        expect(profile.slug).toBe("harper-quinn");
    });

    it("validates prose-rich voice guidance", () => {
        const voice = {
            character: "harper-quinn",
            sound: "Dry, precise, and allergic to sentimental phrasing.",
            samples: [{ text: "I said it was survivable. I didn't say it was smart." }],
        };

        expect(Value.Check(characterVoiceSchema, voice)).toBe(true);
        expect(voice.samples).toHaveLength(1);
    });

    it("validates appendable development and reference entries", () => {
        const event = {
            episode: "001",
            type: "change",
            summary: "Harper accepts help but calls it tactical necessity.",
            stateAfter: "More willing to collaborate, still defensive.",
        };
        const reference = {
            file: "episodes/003.md",
            kind: "voice-example",
            note: "Strong dry-humor deflection under pressure.",
        };

        expect(Value.Check(characterDevelopmentEventSchema, event)).toBe(true);
        expect(Value.Check(characterReferenceEntrySchema, reference)).toBe(true);
    });
});
