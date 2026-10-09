import { CatalogItemModel } from "../models/CatalogItem";
import { toCatalogItemDto } from "../mappers/catalogItemMapper";
import type { CatalogItem } from "../types";

export const catalogService = {
  getCatalog(): CatalogItem[] {
    return CatalogItemModel.findAll().map(toCatalogItemDto);
  },
};
