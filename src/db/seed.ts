import { CatalogItemModel } from "../models/CatalogItem";
import { toCatalogItemRow } from "../mappers/catalogItemMapper";
import { CATALOG_SEED } from "./seedData";

export function seedCatalog(): void {
  if (CatalogItemModel.count() > 0) return;
  CatalogItemModel.bulkCreate(CATALOG_SEED.map(toCatalogItemRow));
}
