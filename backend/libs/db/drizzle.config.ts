import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { config } from "dotenv";
import * as schema from "./schema";

config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export const db = drizzle(client, { schema });
