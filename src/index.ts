import { initializeDb } from "./db/connection";
import { createApp } from "./app";

initializeDb();

const app = createApp();
const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`workspace-designer-backend listening on port ${port}`);
});
