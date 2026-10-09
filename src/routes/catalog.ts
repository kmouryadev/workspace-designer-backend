import { Router } from "express";
import { catalogController } from "../controllers/catalogController";

export function createCatalogRouter(): Router {
  const router = Router();
  router.get("/catalog", catalogController.getCatalog);
  return router;
}
