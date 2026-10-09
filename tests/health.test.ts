import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { initializeDb } from "../src/db/connection";
import { createApp } from "../src/app";

describe("GET /health", () => {
  beforeEach(() => {
    initializeDb(":memory:");
  });

  it("returns ok: true", async () => {
    const app = createApp();

    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
