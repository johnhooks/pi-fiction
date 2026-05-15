import { type Static, Type } from "typebox";
import { characterDevelopmentEventSchema, characterReferenceEntrySchema, characterSlugSchema } from "./schemas.js";

export const characterCreationRoleSchema = Type.Union([
    Type.Literal("protagonist"),
    Type.Literal("antagonist"),
    Type.Literal("ally"),
    Type.Literal("love-interest"),
    Type.Literal("mentor"),
    Type.Literal("foil"),
    Type.Literal("wildcard"),
    Type.Literal("ensemble"),
    Type.Literal("unknown"),
]);

export const characterStoryModeSchema = Type.Union([
    Type.Literal("general"),
    Type.Literal("comedy"),
    Type.Literal("mystery"),
    Type.Literal("romance"),
    Type.Literal("horror"),
    Type.Literal("adventure"),
    Type.Literal("fantasy"),
    Type.Literal("sci-fi"),
    Type.Literal("literary"),
    Type.Literal("custom"),
]);

export const characterModeElementSchema = Type.Object({
    name: Type.String({ minLength: 1 }),
    value: Type.String({ minLength: 1 }),
});

export const characterModeLensSchema = Type.Object({
    mode: characterStoryModeSchema,
    label: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String()),
    elements: Type.Optional(Type.Array(characterModeElementSchema)),
    risks: Type.Optional(Type.Array(Type.String())),
});

export const characterCreationFocusSchema = Type.Union([
    Type.Literal("desire"),
    Type.Literal("wound"),
    Type.Literal("voice"),
    Type.Literal("relationship"),
    Type.Literal("contradiction"),
    Type.Literal("scene-test"),
    Type.Literal("unknown"),
]);

export const characterCreationSeedSchema = Type.Object({
    name: Type.Optional(Type.String()),
    slug: Type.Optional(characterSlugSchema),
    role: Type.Optional(characterCreationRoleSchema),
    storyMode: Type.Optional(characterStoryModeSchema),
    customStoryMode: Type.Optional(Type.String()),
    focus: Type.Optional(characterCreationFocusSchema),
    storyContext: Type.Optional(Type.String()),
    vibe: Type.Optional(Type.Array(Type.String())),
    knownFacts: Type.Optional(Type.Array(Type.String())),
    openQuestions: Type.Optional(Type.Array(Type.String())),
});

export const characterDirectionOptionSchema = Type.Object({
    id: Type.String({ minLength: 1 }),
    title: Type.String({ minLength: 1 }),
    coreAppeal: Type.String({ minLength: 1 }),
    storyFunction: Type.String({ minLength: 1 }),
    centralContradiction: Type.String({ minLength: 1 }),
    pressureSource: Type.String({ minLength: 1 }),
    funToWrite: Type.String({ minLength: 1 }),
    lenses: Type.Optional(Type.Array(characterModeLensSchema)),
    risks: Type.Optional(Type.Array(Type.String())),
    questions: Type.Optional(Type.Array(Type.String())),
});

export const characterDirectionSetSchema = Type.Object({
    seed: characterCreationSeedSchema,
    options: Type.Array(characterDirectionOptionSchema, { minItems: 2, maxItems: 5 }),
    recommendedOptionId: Type.Optional(Type.String()),
});

export const characterPressureProbeAnswerSchema = Type.Object({
    label: Type.String({ minLength: 1 }),
    answer: Type.String({ minLength: 1 }),
    implication: Type.String({ minLength: 1 }),
});

export const characterPressureProbeSchema = Type.Object({
    id: Type.String({ minLength: 1 }),
    scenario: Type.String({ minLength: 1 }),
    question: Type.String({ minLength: 1 }),
    reveals: Type.Array(Type.String(), { minItems: 1 }),
    suggestedAnswers: Type.Optional(Type.Array(characterPressureProbeAnswerSchema)),
});

export const characterPressureProbeSetSchema = Type.Object({
    characterName: Type.Optional(Type.String()),
    directionId: Type.String({ minLength: 1 }),
    probes: Type.Array(characterPressureProbeSchema, { minItems: 2, maxItems: 6 }),
});

export const characterVoiceAuditionSchema = Type.Object({
    characterName: Type.Optional(Type.String()),
    voiceThesis: Type.String({ minLength: 1 }),
    hidesBy: Type.Optional(Type.Array(Type.String())),
    dialogueSamples: Type.Array(Type.String({ minLength: 1 }), { minItems: 2, maxItems: 8 }),
    internalMonologueSample: Type.Optional(Type.String()),
    soundsLike: Type.Optional(Type.Array(Type.String())),
    doesNotSoundLike: Type.Optional(Type.Array(Type.String())),
    revisionNotes: Type.Optional(Type.Array(Type.String())),
});

export const characterCreationProfileDraftSchema = Type.Object({
    essence: Type.String({ minLength: 1 }),
    storyRole: Type.String({ minLength: 1 }),
    storyLenses: Type.Optional(Type.Array(characterModeLensSchema)),
    wants: Type.Optional(Type.Array(Type.String())),
    needs: Type.Optional(Type.Array(Type.String())),
    fearOrWound: Type.Optional(Type.String()),
    contradictions: Type.Optional(Type.Array(Type.String())),
    pressurePoints: Type.Optional(Type.Array(Type.String())),
    values: Type.Optional(Type.Array(Type.String())),
    blindSpots: Type.Optional(Type.Array(Type.String())),
    writeDo: Type.Optional(Type.Array(Type.String())),
    writeAvoid: Type.Optional(Type.Array(Type.String())),
});

export const characterCreationVoiceDraftSchema = Type.Object({
    voiceThesis: Type.String({ minLength: 1 }),
    thoughtTexture: Type.Optional(Type.String()),
    avoidancePatterns: Type.Optional(Type.Array(Type.String())),
    dialogueHabits: Type.Optional(Type.Array(Type.String())),
    sampleLines: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    internalMonologueExample: Type.Optional(Type.String()),
    soundsLike: Type.Optional(Type.Array(Type.String())),
    doesNotSoundLike: Type.Optional(Type.Array(Type.String())),
});

export const characterCreationRelationshipEventDraftSchema = Type.Object({
    with: Type.Array(characterSlugSchema, { minItems: 1 }),
    type: Type.String({ minLength: 1 }),
    summary: Type.String({ minLength: 1 }),
    currentState: Type.Optional(Type.String()),
    tension: Type.Optional(Type.Array(Type.String())),
    affection: Type.Optional(Type.Array(Type.String())),
    conflict: Type.Optional(Type.Array(Type.String())),
    stateAfter: Type.Optional(Type.String()),
    weight: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
    source: Type.Optional(Type.String()),
});

export const characterCreationDraftSchema = Type.Object({
    name: Type.String({ minLength: 1 }),
    slug: characterSlugSchema,
    storyMode: Type.Optional(characterStoryModeSchema),
    tags: Type.Optional(Type.Array(Type.String())),
    profile: characterCreationProfileDraftSchema,
    voice: characterCreationVoiceDraftSchema,
    relationships: Type.Optional(Type.Array(characterCreationRelationshipEventDraftSchema)),
    development: Type.Optional(Type.Array(characterDevelopmentEventSchema)),
    references: Type.Optional(Type.Array(characterReferenceEntrySchema)),
    notes: Type.Optional(Type.Array(Type.String())),
    nextBestMoves: Type.Optional(Type.Array(Type.String())),
});

export type CharacterCreationRole = Static<typeof characterCreationRoleSchema>;
export type CharacterStoryMode = Static<typeof characterStoryModeSchema>;
export type CharacterModeElement = Static<typeof characterModeElementSchema>;
export type CharacterModeLens = Static<typeof characterModeLensSchema>;
export type CharacterCreationFocus = Static<typeof characterCreationFocusSchema>;
export type CharacterCreationSeed = Static<typeof characterCreationSeedSchema>;
export type CharacterDirectionOption = Static<typeof characterDirectionOptionSchema>;
export type CharacterDirectionSet = Static<typeof characterDirectionSetSchema>;
export type CharacterPressureProbeAnswer = Static<typeof characterPressureProbeAnswerSchema>;
export type CharacterPressureProbe = Static<typeof characterPressureProbeSchema>;
export type CharacterPressureProbeSet = Static<typeof characterPressureProbeSetSchema>;
export type CharacterVoiceAudition = Static<typeof characterVoiceAuditionSchema>;
export type CharacterCreationProfileDraft = Static<typeof characterCreationProfileDraftSchema>;
export type CharacterCreationVoiceDraft = Static<typeof characterCreationVoiceDraftSchema>;
export type CharacterCreationRelationshipEventDraft = Static<typeof characterCreationRelationshipEventDraftSchema>;
export type CharacterCreationDraft = Static<typeof characterCreationDraftSchema>;
