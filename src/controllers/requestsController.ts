import type { Request, Response } from "express";
import { rentalRequestService } from "../services/rentalRequestService";
import type { RentalRequestInput } from "../types";

export const requestsController = {
  create(req: Request, res: Response): void {
    const result = rentalRequestService.submit(req.body as RentalRequestInput);

    if ("errors" in result) {
      res.status(400).json({ errors: result.errors });
      return;
    }

    res.status(201).json(result.request);
  },

  list(_req: Request, res: Response): void {
    res.json(rentalRequestService.listAll());
  },

  getById(req: Request, res: Response): void {
    const found = rentalRequestService.getById(req.params.id);

    if (!found) {
      res.status(404).json({ error: "Request not found." });
      return;
    }

    res.json(found);
  },
};
