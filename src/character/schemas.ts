import { type Static, Type } from "typebox";

export const characterSlugSchema = Type.String({ pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" });

export const characterDocumentKindSchema = Type.Union([
    Type.Literal("profile"),
    Type.Literal("voice"),
    Type.Literal("relationships"),
    Type.Literal("development"),
    Type.Literal("references"),
    Type.Literal("notes"),
]);

export const characterFolderSchema = Type.Object({
    slug: characterSlugSchema,
    path: Type.String({ minLength: 1 }),
    documents: Type.Optional(Type.Array(characterDocumentKindSchema)),
});

export const characterProfileSchema = Type.Object({
    name: Type.String({ minLength: 1 }),
    slug: characterSlugSchema,
    summary: Type.String({ minLength: 1 }),
    storyRole: Type.Optional(Type.String()),
    currentWant: Type.Optional(Type.String()),
    deeperNeed: Type.Optional(Type.String()),
    fearOrWound: Type.Optional(Type.String()),
    contradictions: Type.Optional(Type.Array(Type.String())),
    pressurePoints: Type.Optional(Type.Array(Type.String())),
    values: Type.Optional(Type.Array(Type.String())),
    blindSpots: Type.Optional(Type.Array(Type.String())),
    writeDo: Type.Optional(Type.Array(Type.String())),
    writeAvoid: Type.Optional(Type.Array(Type.String())),
});

export const characterVoiceSampleSchema = Type.Object({
    label: Type.Optional(Type.String()),
    context: Type.Optional(Type.String()),
    text: Type.String({ minLength: 1 }),
});

export const characterVoiceSchema = Type.Object({
    character: characterSlugSchema,
    sound: Type.Optional(Type.String()),
    thoughtTexture: Type.Optional(Type.String()),
    avoidancePatterns: Type.Optional(Type.Array(Type.String())),
    dialogueHabits: Type.Optional(Type.Array(Type.String())),
    internalMonologue: Type.Optional(Type.String()),
    samples: Type.Optional(Type.Array(characterVoiceSampleSchema)),
    soundsLike: Type.Optional(Type.Array(Type.String())),
    doesNotSoundLike: Type.Optional(Type.Array(Type.String())),
});

export const characterRelationshipEventSchema = Type.Object({
    episode: Type.Optional(Type.String()),
    scene: Type.Optional(Type.String()),
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

export const characterDevelopmentEventSchema = Type.Object({
    episode: Type.Optional(Type.String()),
    date: Type.Optional(Type.String()),
    type: Type.Union([
        Type.Literal("change"),
        Type.Literal("reveal"),
        Type.Literal("decision"),
        Type.Literal("relationship"),
        Type.Literal("voice"),
        Type.Literal("continuity"),
        Type.Literal("note"),
    ]),
    summary: Type.String({ minLength: 1 }),
    impact: Type.Optional(Type.String()),
    stateAfter: Type.Optional(Type.String()),
    source: Type.Optional(Type.String()),
});

export const characterReferenceEntrySchema = Type.Object({
    file: Type.String({ minLength: 1 }),
    kind: Type.Union([
        Type.Literal("voice-example"),
        Type.Literal("background"),
        Type.Literal("plot"),
        Type.Literal("relationship"),
        Type.Literal("continuity"),
        Type.Literal("callback"),
        Type.Literal("scene"),
    ]),
    note: Type.String({ minLength: 1 }),
    anchor: Type.Optional(Type.String()),
});

export type CharacterSlug = Static<typeof characterSlugSchema>;
export type CharacterDocumentKind = Static<typeof characterDocumentKindSchema>;
export type CharacterFolder = Static<typeof characterFolderSchema>;
export type CharacterProfile = Static<typeof characterProfileSchema>;
export type CharacterVoice = Static<typeof characterVoiceSchema>;
export type CharacterVoiceSample = Static<typeof characterVoiceSampleSchema>;
export type CharacterRelationshipEvent = Static<typeof characterRelationshipEventSchema>;
export type CharacterDevelopmentEvent = Static<typeof characterDevelopmentEventSchema>;
export type CharacterReferenceEntry = Static<typeof characterReferenceEntrySchema>;
