import { sql } from "drizzle-orm";
import { getDb } from "../db/connection";
import { catalogItems } from "../db/schema";

export type CatalogItemRow = typeof catalogItems.$inferSelect;
export type NewCatalogItemRow = typeof catalogItems.$inferInsert;

export const CatalogItemModel = {
  findAll(): CatalogItemRow[] {
    return getDb().select().from(catalogItems).orderBy(catalogItems.category, catalogItems.id).all();
  },

  count(): number {
    const row = getDb().select({ count: sql<number>`count(*)` }).from(catalogItems).get();
    return row?.count ?? 0;
  },

  bulkCreate(rows: NewCatalogItemRow[]): void {
    getDb().insert(catalogItems).values(rows).run();
  },
};
