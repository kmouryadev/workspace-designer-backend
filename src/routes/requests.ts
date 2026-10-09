import { Router } from "express";
import { requestsController } from "../controllers/requestsController";
import { requireApiKey } from "../middleware/adminAuth";

export function createRequestsRouter(apiKey: string): Router {
  const router = Router();
  router.post("/requests", requestsController.create);
  router.get("/requests", requireApiKey(apiKey), requestsController.list);
  router.get("/requests/:id", requestsController.getById);
  return router;
}
