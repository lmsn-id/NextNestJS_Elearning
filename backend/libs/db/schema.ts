// libs/db/schema.ts
import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  json,
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

export const dataakademik = pgTable("dataakademik", {
  id: varchar("id", { length: 36 }).primaryKey(),
  nuptk: varchar("nuptk", { length: 20 }),
  nip: varchar("nip", { length: 20 }).notNull().unique(),
  nama: varchar("nama", { length: 50 }).notNull(),
  jenis_kelamin: varchar("jenis_kelamin", { length: 10 }),
  tempat_lahir: varchar("tempat_lahir", { length: 50 }),
  tanggal_lahir: timestamp("tanggal_lahir", { mode: "string" }),
  agama: varchar("agama", { length: 10 }),
  alamat: text("alamat"),
  no_telepon: text("no_telepon"),
  email: text("email"),
  posisi: varchar("posisi", { length: 20 }).notNull(),
  kelas: varchar("kelas", { length: 10 }),
  materi: json("materi"),
  created_at: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string", withTimezone: true }),
});

export const dataabsensi = pgTable("dataabsensi", {
  id: varchar("id", { length: 36 }).primaryKey(),
  tanggal: timestamp("tanggal", { mode: "string" }).notNull(),
  matapelajaran: text("matapelajaran"),
  data_siswa: json("data_siswa").notNull(),
  created_at: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
});
