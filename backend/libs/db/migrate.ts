import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./drizzle.config";

(async () => {
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "libs/db/migrations" });
  console.log("Migrations completed!");
  process.exit(0);
})();
