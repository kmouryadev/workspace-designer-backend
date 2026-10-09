import type { Request, Response } from "express";
import { catalogService } from "../services/catalogService";

export const catalogController = {
  getCatalog(_req: Request, res: Response): void {
    res.json(catalogService.getCatalog());
  },
};
