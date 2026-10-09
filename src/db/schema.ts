import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const catalogItems = sqliteTable("catalog_items", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  spec: text("spec").notNull(),
  priceK: integer("price_k").notNull(),
  maxQuantity: integer("max_quantity").notNull(),
});

export const rentalRequests = sqliteTable("rental_requests", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  location: text("location").notNull(),
  startDate: text("start_date").notNull(),
  duration: text("duration").notNull(),
  message: text("message"),
  setupDesk: text("setup_desk"),
  setupChair: text("setup_chair"),
  setupItems: text("setup_items").notNull(),
  monthlyTotalK: integer("monthly_total_k").notNull(),
  periodTotalK: integer("period_total_k").notNull(),
  createdAt: text("created_at").notNull(),
});
