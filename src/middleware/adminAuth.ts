import type { Request, Response, NextFunction } from "express";

export function requireApiKey(apiKey: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const provided = req.header("x-api-key");
    if (!provided || provided !== apiKey) {
      res.status(401).json({ error: "Missing or invalid API key." });
      return;
    }
    next();
  };
}
