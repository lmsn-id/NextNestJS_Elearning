// libs/db/schema.ts
import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  email: text("email"),
  password: text("password").notNull(),
  phone: text("phone"),
  address: text("address"),
  role: text("role").notNull().default("user"),
  is_superuser: boolean("is_superuser").notNull().default(false),
  created_at: timestamp("created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
});

export const accsestoken = pgTable("accsestoken", {
  id: varchar("id", { length: 36 }).primaryKey(),
  user_id: varchar("user_id", { length: 36 }).notNull(),
  token: text("token").notNull().unique(),
  created_at: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  expired: timestamp("expired", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
});

export const datasiswa = pgTable("datasiswa", {
  id: varchar("id", { length: 36 }).primaryKey(),
  nis: varchar("nis", { length: 17 }).notNull().unique(),
  nisn: varchar("nisn", { length: 15 }),
  nama: varchar("nama", { length: 50 }).notNull(),
  agama: varchar("agama", { length: 10 }),
  jurusan: varchar("jurusan", { length: 50 }).notNull(),
  kelas: varchar("kelas", { length: 10 }).notNull(),
  alamat: text("alamat"),
  no_telepon: text("no_telepon"),
  email: text("email"),
  jenis_kelamin: varchar("jenis_kelamin", { length: 10 }),
  tempat_lahir: varchar("tempat_lahir", { length: 50 }),
  tanggal_lahir: timestamp("tanggal_lahir", { mode: "string" }),
  created_at: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string", withTimezone: true }),
});
