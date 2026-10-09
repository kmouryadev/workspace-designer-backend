import { RentalRequestModel } from "../models/RentalRequest";
import { validateRentalRequest } from "../validation/validateRentalRequest";
import { generateRequestId } from "../utils/requestId";
import { toRentalRequestRow, toRentalRequestDto, type RentalRequestDto } from "../mappers/rentalRequestMapper";
import type { RentalRequestInput, FieldErrors } from "../types";

export const rentalRequestService = {
  submit(input: RentalRequestInput): { errors: FieldErrors } | { request: RentalRequestDto } {
    const errors = validateRentalRequest(input);
    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    const id = generateRequestId();
    const createdAt = new Date().toISOString();
    RentalRequestModel.create(toRentalRequestRow(input, id, createdAt));

    return { request: { ...input, id, createdAt } };
  },

  listAll(): RentalRequestDto[] {
    return RentalRequestModel.findAll().map(toRentalRequestDto);
  },
};
