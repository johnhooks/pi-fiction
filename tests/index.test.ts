import { describe, expect, it } from "vitest";
import { piFiction } from "../src/index.js";

describe("piFiction", () => {
    it("describes the package", () => {
        expect(piFiction.name).toBe("pi-fiction");
    });
});
