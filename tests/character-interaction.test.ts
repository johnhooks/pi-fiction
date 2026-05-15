import { Value } from "typebox/value";
import { describe, expect, it } from "vitest";
import {
    characterCreationDraftSchema,
    characterDirectionSetSchema,
    characterPressureProbeSetSchema,
    characterVoiceAuditionSchema,
} from "../src/index.js";

describe("character interaction schemas", () => {
    it("validates direction options for user selection", () => {
        const directions = {
            seed: {
                name: "Mara Vale",
                role: "protagonist",
                storyMode: "comedy",
                focus: "contradiction",
                vibe: ["salt-stained", "practical", "haunted"],
            },
            options: [
                {
                    id: "reluctant-medium",
                    title: "Reluctant medium mechanic",
                    coreAppeal: "A practical person haunted by impossible voices.",
                    storyFunction: "Pulls the mystery into working harbor life.",
                    centralContradiction: "Can hear the dead but trusts only tools.",
                    pressureSource: "A wreck speaks with her mother's voice.",
                    funToWrite: "She argues with prophecy like it is a bad repair ticket.",
                    lenses: [
                        {
                            mode: "comedy",
                            label: "straight character",
                            elements: [
                                { name: "obsession", value: "competence under pressure" },
                                { name: "blind spot", value: "cannot see that care is not the same as control" },
                                { name: "coping mechanism", value: "turns feelings into repair logistics" },
                            ],
                        },
                    ],
                },
                {
                    id: "debtor-sister",
                    title: "Debtor sister",
                    coreAppeal: "Family loyalty keeps forcing her into danger.",
                    storyFunction: "Turns supernatural stakes into immediate survival pressure.",
                    centralContradiction: "Rejects responsibility while raising everyone around her.",
                    pressureSource: "Her brother owes the wrong people.",
                    funToWrite: "Every tender act arrives disguised as irritation.",
                },
            ],
        };

        expect(Value.Check(characterDirectionSetSchema, directions)).toBe(true);
        expect(directions.options).toHaveLength(2);
        expect(directions.options[0]?.lenses?.[0]?.mode).toBe("comedy");
    });

    it("validates pressure probes and voice auditions", () => {
        const probes = {
            directionId: "reluctant-medium",
            probes: [
                {
                    id: "thanks",
                    scenario: "Someone thanks Mara sincerely after she saves them.",
                    question: "How does she dodge the intimacy?",
                    reveals: ["relationship to praise", "deflection style"],
                },
                {
                    id: "betray-value",
                    scenario: "She can protect Tomas by lying to someone vulnerable.",
                    question: "What line will she cross, and what line won't she?",
                    reveals: ["moral edge", "protective instinct"],
                },
            ],
        };
        const audition = {
            voiceThesis: "Dry competence under supernatural stress.",
            dialogueSamples: ["That's not fate. That's bad rope.", "I prevented paperwork. Try to keep up."],
        };

        expect(Value.Check(characterPressureProbeSetSchema, probes)).toBe(true);
        expect(Value.Check(characterVoiceAuditionSchema, audition)).toBe(true);
    });

    it("validates an intermediate character creation draft", () => {
        const draft = {
            name: "Mara Vale",
            slug: "mara-vale",
            storyMode: "comedy",
            tags: ["protagonist"],
            profile: {
                essence: "A harbor mechanic who can hear drowned ships.",
                storyRole: "Reluctant protagonist and practical witness.",
                wants: ["Keep her shop open"],
                needs: ["Trust before she has perfect proof"],
            },
            voice: {
                voiceThesis: "A mechanic arguing with destiny about labor costs.",
                sampleLines: ["If the ghost wants an appointment, it can stop flooding my intake valves."],
            },
            relationships: [
                {
                    with: ["ilyan-rook"],
                    type: "wary-alliance",
                    summary: "Mara needs Rook's map and hates that he knows it.",
                    weight: 0.8,
                },
            ],
        };

        expect(Value.Check(characterCreationDraftSchema, draft)).toBe(true);
        expect(draft.slug).toBe("mara-vale");
        expect(draft.relationships[0]?.with).toEqual(["ilyan-rook"]);
    });
});
