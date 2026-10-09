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
  const apiKey = "test-admin-key";

  beforeEach(() => {
    initializeDb(":memory:");
  });

  it("creates a request and returns 201 with a generated id", async () => {
    const app = createApp(apiKey);

    const res = await request(app).post("/requests").send(validBody());

    expect(res.status).toBe(201);
    expect(res.body.id).toMatch(/^MR-\d{5}$/);
    expect(res.body.fullName).toBe("Jane Doe");

    const rows = RentalRequestModel.findAll();
    expect(rows.some((row) => row.id === res.body.id)).toBe(true);
  });

  it("returns 400 with field errors for invalid input", async () => {
    const app = createApp(apiKey);

    const res = await request(app).post("/requests").send(validBody({ email: "nope" }));

    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBe("Enter a valid email, like name@example.com.");
  });

  it("does not insert a row when validation fails", async () => {
    const app = createApp(apiKey);

    await request(app).post("/requests").send(validBody({ fullName: "" }));

    expect(RentalRequestModel.count()).toBe(0);
  });
});

describe("GET /requests", () => {
  const apiKey = "test-admin-key";

  beforeEach(() => {
    initializeDb(":memory:");
  });

  it("returns 401 without an api key", async () => {
    const app = createApp(apiKey);

    const res = await request(app).get("/requests");

    expect(res.status).toBe(401);
  });

  it("returns 401 with the wrong api key", async () => {
    const app = createApp(apiKey);

    const res = await request(app).get("/requests").set("x-api-key", "wrong-key");

    expect(res.status).toBe(401);
  });

  it("returns requests newest first with the right api key", async () => {
    const app = createApp(apiKey);

    await request(app).post("/requests").send(validBody({ fullName: "First" }));
    await request(app).post("/requests").send(validBody({ fullName: "Second" }));

    const res = await request(app).get("/requests").set("x-api-key", apiKey);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].fullName).toBe("Second");
    expect(res.body[1].fullName).toBe("First");
  });
});

describe("GET /requests/:id", () => {
  beforeEach(() => {
    initializeDb(":memory:");
  });

  it("returns the request matching the id, no api key required", async () => {
    const app = createApp();

    const created = await request(app).post("/requests").send(validBody());
    const res = await request(app).get(`/requests/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
    expect(res.body.fullName).toBe("Jane Doe");
  });

  it("returns 404 for an id that does not exist", async () => {
    const app = createApp();

    const res = await request(app).get("/requests/MR-00000");

    expect(res.status).toBe(404);
  });
});
