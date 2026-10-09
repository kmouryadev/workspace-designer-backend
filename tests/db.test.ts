import { describe, it, expect } from "vitest";
import { createDb } from "../src/db/connection";

describe("createDb", () => {
  it("creates catalog_items and rental_requests tables", () => {
    const db = createDb(":memory:");

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
      .all()
      .map((row) => (row as { name: string }).name);

    expect(tables).toContain("catalog_items");
    expect(tables).toContain("rental_requests");

    db.close();
  });
});
