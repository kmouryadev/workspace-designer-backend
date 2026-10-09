import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

export type DrizzleDb = BetterSQLite3Database<typeof schema>;

let dbInstance: DrizzleDb | null = null;

export function createDb(filePath: string = process.env.DB_PATH ?? "./data.sqlite"): Database.Database {
  if (filePath !== ":memory:") {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  const db = new Database(filePath);
  db.pragma("journal_mode = WAL");
  migrate(db);
  return db;
}

export function initializeDb(filePath: string = process.env.DB_PATH ?? "./data.sqlite"): DrizzleDb {
  dbInstance = drizzle(createDb(filePath), { schema });
  return dbInstance;
}

export function getDb(): DrizzleDb {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call initializeDb() first.");
  }
  return dbInstance;
}

function migrate(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS catalog_items (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      spec TEXT NOT NULL,
      price_k INTEGER NOT NULL,
      max_quantity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rental_requests (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      location TEXT NOT NULL,
      start_date TEXT NOT NULL,
      duration TEXT NOT NULL,
      message TEXT,
      setup_desk TEXT,
      setup_chair TEXT,
      setup_items TEXT NOT NULL,
      monthly_total_k INTEGER NOT NULL,
      period_total_k INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}
