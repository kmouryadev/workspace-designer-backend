import { describe, it, expect } from "vitest";
import { validateRentalRequest } from "../src/validation/validateRentalRequest";
import type { RentalRequestInput } from "../src/types";

function validInput(overrides: Partial<RentalRequestInput> = {}): RentalRequestInput {
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
    setupItems: { "m27": 2 },
    monthlyTotalK: 1100,
    periodTotalK: 1100,
    ...overrides,
  };
}

describe("validateRentalRequest", () => {
  it("returns no errors for valid input", () => {
    expect(validateRentalRequest(validInput())).toEqual({});
  });

  it("requires fullName", () => {
    const errors = validateRentalRequest(validInput({ fullName: "  " }));
    expect(errors.fullName).toBe("Enter your full name.");
  });

  it("requires a valid email", () => {
    const errors = validateRentalRequest(validInput({ email: "not-an-email" }));
    expect(errors.email).toBe("Enter a valid email, like name@example.com.");
  });

  it("requires a WhatsApp number with a country code", () => {
    const errors = validateRentalRequest(validInput({ whatsapp: "0812345" }));
    expect(errors.whatsapp).toBe("Use a number with country code, like +62 812 3456 7890.");
  });

  it("requires a location", () => {
    const errors = validateRentalRequest(validInput({ location: "" }));
    expect(errors.location).toBe("Tell us where in Bali to deliver.");
  });

  it("requires a start date", () => {
    const errors = validateRentalRequest(validInput({ startDate: "" }));
    expect(errors.startDate).toBe("Choose a start date.");
  });

  it("rejects a start date in the past", () => {
    const errors = validateRentalRequest(validInput({ startDate: "2020-01-01" }));
    expect(errors.startDate).toBe("The start date cannot be in the past.");
  });
});
