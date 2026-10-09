import express, { type Express } from "express";
import cors from "cors";
import { createCatalogRouter } from "./routes/catalog";
import { createRequestsRouter } from "./routes/requests";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
    })
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use(createCatalogRouter());
  app.use(createRequestsRouter());

  return app;
}
