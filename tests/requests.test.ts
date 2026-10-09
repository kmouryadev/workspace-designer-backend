import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { initializeDb } from "../src/db/connection";
import { createApp } from "../src/app";
import { RentalRequestModel } from "../src/models/RentalRequest";

function validBody(overrides: Record<string, unknown> = {}) {
  const future = new Date();
  future.setDate(future.getDate() + 7);

  return {
    fullName: "Jane Doe",
    email: "jane@example.com",
    whatsapp: "+62 812 3456 7890",
    location: "Canggu, Badung",
    startDate: future.toISOString().slice(0, 10),
    duration: "monthly",
    message: "",
    setupDesk: "desk-std",
    setupChair: "chair-ergo",
    setupItems: { m27: 2 },
    monthlyTotalK: 1100,
    periodTotalK: 1100,
    ...overrides,
  };
}

describe("POST /requests", () => {
  beforeEach(() => {
    initializeDb(":memory:");
  });

  it("creates a request and returns 201 with a generated id", async () => {
    const app = createApp();

    const res = await request(app).post("/requests").send(validBody());

    expect(res.status).toBe(201);
    expect(res.body.id).toMatch(/^MR-\d{5}$/);
    expect(res.body.fullName).toBe("Jane Doe");

    const rows = RentalRequestModel.findAll();
    expect(rows.some((row) => row.id === res.body.id)).toBe(true);
  });

  it("returns 400 with field errors for invalid input", async () => {
    const app = createApp();

    const res = await request(app).post("/requests").send(validBody({ email: "nope" }));

    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBe("Enter a valid email, like name@example.com.");
  });

  it("does not insert a row when validation fails", async () => {
    const app = createApp();

    await request(app).post("/requests").send(validBody({ fullName: "" }));

    expect(RentalRequestModel.count()).toBe(0);
  });
});
