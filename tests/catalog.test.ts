import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { initializeDb } from "../src/db/connection";
import { seedCatalog } from "../src/db/seed";
import { createApp } from "../src/app";

describe("GET /catalog", () => {
  beforeEach(() => {
    initializeDb(":memory:");
    seedCatalog();
  });

  it("returns all seeded catalog items", async () => {
    const app = createApp();

    const res = await request(app).get("/catalog");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(34);
  });

  it("returns items shaped with id, category, name, spec, priceK, maxQuantity", async () => {
    const app = createApp();

    const res = await request(app).get("/catalog");
    const deskStd = res.body.find((item: { id: string }) => item.id === "desk-std");

    expect(deskStd).toEqual({
      id: "desk-std",
      category: "desk",
      name: "Standing Desk Pro",
      spec: "Height adjustable, 120 x 70 cm",
      priceK: 450,
      maxQuantity: 1,
    });
  });
});
