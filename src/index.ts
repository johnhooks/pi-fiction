export * from "./character/index.js";
export * from "./gist/index.js";

export const piFiction = {
    name: "pi-fiction",
} as const;

export type PiFiction = typeof piFiction;
