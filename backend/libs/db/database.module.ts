// libs/db/database.module.ts
import { Module } from "@nestjs/common";
import { db } from "./drizzle.config";

@Module({
  providers: [{ provide: "DATABASE_CONNECTION", useValue: db }],
  exports: ["DATABASE_CONNECTION"],
})
export class DatabaseModule {}
