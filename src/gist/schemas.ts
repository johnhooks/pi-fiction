import { type Static, Type } from "typebox";

export const gistOptionKindSchema = Type.Union([
    Type.Literal("story"),
    Type.Literal("character"),
    Type.Literal("world"),
    Type.Literal("style"),
    Type.Literal("scene"),
    Type.Literal("review"),
    Type.Literal("custom"),
]);

export const gistOptionSchema = Type.Object({
    id: Type.String({ minLength: 1 }),
    title: Type.String({ minLength: 1, description: "Short handle for this option." }),
    summary: Type.String({ minLength: 1, description: "Compact explanation of the idea." }),
    reasonLabel: Type.Optional(
        Type.String({ minLength: 1, description: "Contextual label for why this option matters." }),
    ),
    whyAlive: Type.String({ minLength: 1, description: "Why this might create story energy." }),
    detailLabel: Type.Optional(Type.String({ minLength: 1, description: "Contextual label for the optional detail." })),
    detail: Type.Optional(Type.String({ description: "One concrete detail, example, or question." })),
});

export const gistOptionSetSchema = Type.Object({
    kind: gistOptionKindSchema,
    gist: Type.String({ minLength: 1 }),
    options: Type.Array(gistOptionSchema, { minItems: 1, maxItems: 6 }),
    note: Type.Optional(Type.String()),
});

export type GistOptionKind = Static<typeof gistOptionKindSchema>;
export type GistOption = Static<typeof gistOptionSchema>;
export type GistOptionSet = Static<typeof gistOptionSetSchema>;

export type GistOptionAction = "continue" | "next" | "revise" | "add_input" | "surprise" | "stop";
