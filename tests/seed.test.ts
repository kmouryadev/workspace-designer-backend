import { describe, it, expect, beforeEach } from "vitest";
import { initializeDb } from "../src/db/connection";
import { seedCatalog } from "../src/db/seed";
import { CatalogItemModel } from "../src/models/CatalogItem";
import { CATALOG_SEED } from "../src/db/seedData";

describe("seedCatalog", () => {
  beforeEach(() => {
    initializeDb(":memory:");
  });

  it("inserts every seed item into an empty table", () => {
    seedCatalog();

    expect(CatalogItemModel.count()).toBe(CATALOG_SEED.length);
  });

  it("is idempotent — running it twice does not duplicate rows", () => {
    seedCatalog();
    seedCatalog();

    expect(CatalogItemModel.count()).toBe(CATALOG_SEED.length);
  });
});
