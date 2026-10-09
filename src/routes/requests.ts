import { Router } from "express";
import { requestsController } from "../controllers/requestsController";

export function createRequestsRouter(): Router {
  const router = Router();
  router.post("/requests", requestsController.create);
  return router;
}
