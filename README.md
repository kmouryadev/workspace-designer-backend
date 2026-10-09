# workspace-designer-backend

API for the monis.rent Workspace Designer: serves the item catalog and
accepts rental requests.

## Tech stack

- Node.js + TypeScript, served with Express
- SQLite via `better-sqlite3`, queried through Drizzle ORM
- Vitest + Supertest for tests

## Project structure

```
src/
  routes/        request -> controller wiring, one router per resource
  controllers/   reads req/res, calls a service, returns a response
  services/      business logic (validation, id generation, orchestration)
  models/        Drizzle queries for one table (findAll/count/create, etc.)
  mappers/       DB row <-> API DTO conversion (snake_case <-> camelCase)
  db/            connection singleton, Drizzle schema, catalog seed data
  middleware/    Express middleware (admin API key check)
  validation/    input validation for incoming requests
  utils/         small standalone helpers (e.g. request id generation)
  types.ts       shared request/response types
  app.ts         builds the Express app (used by tests and index.ts)
  index.ts       process entrypoint: init DB, seed catalog, start server
```

## Getting started

Requires Node.js 20+.

```bash
cp .env.example .env
npm install
npm run dev
```

The API listens on `http://localhost:4000` by default. SQLite data lives
in `data.sqlite` (path configurable via `DB_PATH`); the catalog is seeded
automatically on first run.

> Windows note: if `npm`/`node` aren't recognized in a fresh PowerShell
> window, your Node install may not be on PATH. Run `node -v` to check,
> and point PATH at your Node installation directory if it fails.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | Port the server listens on |
| `DB_PATH` | `./data.sqlite` | SQLite file location |
| `API_KEY` | `change-me` | Required as the `x-api-key` header on `GET /requests` |
| `FRONTEND_ORIGIN` | `http://localhost:3000` | Allowed CORS origin |

`.env` is not auto-loaded by `src/index.ts` — these are read from real
process environment variables. Set them in your shell, your process
manager, or a tool like `dotenv-cli` if you want `.env` loaded for you.

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | none | Liveness check |
| GET | `/catalog` | none | Full item catalog (desks, chairs, monitors, lighting, plants, coffee, surfboards, motorcycles, relax zone) |
| POST | `/requests` | none | Submit a rental request |
| GET | `/requests` | `x-api-key` header | List all rental requests, newest first |
| GET | `/requests/:id` | none | Look up a single rental request by its id (e.g. `MR-12345`) |

## Testing

```bash
npm test
```

## Notes on scope

- The catalog is read-only — there are no endpoints to add/edit/remove
  items yet.
- `POST /requests` does not recompute pricing; it trusts and stores the
  `monthlyTotalK`/`periodTotalK` the frontend sends, which it computes
  from the catalog data it already fetched.
- Not deployed anywhere yet — runs locally only.
- `GET /requests/:id` is unauthenticated by design, so the frontend can let
  a visitor look up their own submission's history. The id (`MR-#####`) is
  the only access control, and the id space is small (5 digits), so this
  is a deliberate, low-stakes tradeoff for a demo app — not something to
  carry into a product handling real personal data without adding a
  harder-to-guess token or real auth.
