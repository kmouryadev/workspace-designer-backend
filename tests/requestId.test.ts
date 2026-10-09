import { describe, it, expect } from "vitest";
import { generateRequestId } from "../src/utils/requestId";

describe("generateRequestId", () => {
  it("matches the MR-##### format", () => {
    const id = generateRequestId();
    expect(id).toMatch(/^MR-\d{5}$/);
  });

  it("produces different ids across calls (not a constant)", () => {
    const ids = new Set(Array.from({ length: 20 }, () => generateRequestId()));
    expect(ids.size).toBeGreaterThan(1);
  });
});
