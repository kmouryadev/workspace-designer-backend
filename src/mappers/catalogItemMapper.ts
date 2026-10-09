import type { CatalogItem } from "../types";
import type { CatalogItemRow, NewCatalogItemRow } from "../models/CatalogItem";
import type { CatalogSeedItem } from "../db/seedData";

export function toCatalogItemDto(row: CatalogItemRow): CatalogItem {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    spec: row.spec,
    priceK: row.priceK,
    maxQuantity: row.maxQuantity,
  };
}

export function toCatalogItemRow(seed: CatalogSeedItem): NewCatalogItemRow {
  return {
    id: seed.id,
    category: seed.category,
    name: seed.name,
    spec: seed.spec,
    priceK: seed.priceK,
    maxQuantity: seed.maxQuantity,
  };
}
