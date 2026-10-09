import type { RentalRequestInput } from "../types";
import type { RentalRequestRow, NewRentalRequestRow } from "../models/RentalRequest";

export type RentalRequestDto = RentalRequestInput & { id: string; createdAt: string };

export function toRentalRequestRow(input: RentalRequestInput, id: string, createdAt: string): NewRentalRequestRow {
  return {
    id,
    fullName: input.fullName,
    email: input.email,
    whatsapp: input.whatsapp,
    location: input.location,
    startDate: input.startDate,
    duration: input.duration,
    message: input.message ?? null,
    setupDesk: input.setupDesk ?? null,
    setupChair: input.setupChair ?? null,
    setupItems: JSON.stringify(input.setupItems ?? {}),
    monthlyTotalK: input.monthlyTotalK,
    periodTotalK: input.periodTotalK,
    createdAt,
  };
}

export function toRentalRequestDto(row: RentalRequestRow): RentalRequestDto {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    whatsapp: row.whatsapp,
    location: row.location,
    startDate: row.startDate,
    duration: row.duration as RentalRequestInput["duration"],
    message: row.message ?? undefined,
    setupDesk: row.setupDesk,
    setupChair: row.setupChair,
    setupItems: JSON.parse(row.setupItems),
    monthlyTotalK: row.monthlyTotalK,
    periodTotalK: row.periodTotalK,
    createdAt: row.createdAt,
  };
}
