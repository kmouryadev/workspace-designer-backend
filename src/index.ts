import { initializeDb } from "./db/connection";
import { seedCatalog } from "./db/seed";
import { createApp } from "./app";

initializeDb();
seedCatalog();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY is not set — GET /requests will reject every request until it is.");
}

const app = createApp(apiKey ?? "");
const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`workspace-designer-backend listening on port ${port}`);
});
