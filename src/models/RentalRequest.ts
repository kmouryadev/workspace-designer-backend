import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "../db/connection";
import { rentalRequests } from "../db/schema";

export type RentalRequestRow = typeof rentalRequests.$inferSelect;
export type NewRentalRequestRow = typeof rentalRequests.$inferInsert;

export const RentalRequestModel = {
  create(row: NewRentalRequestRow): void {
    getDb().insert(rentalRequests).values(row).run();
  },

  findAll(): RentalRequestRow[] {
    return getDb().select().from(rentalRequests).orderBy(desc(rentalRequests.createdAt)).all();
  },

  findById(id: string): RentalRequestRow | undefined {
    return getDb().select().from(rentalRequests).where(eq(rentalRequests.id, id)).get();
  },

  count(): number {
    const row = getDb().select({ count: sql<number>`count(*)` }).from(rentalRequests).get();
    return row?.count ?? 0;
  },
};
