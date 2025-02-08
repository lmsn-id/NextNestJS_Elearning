// auth.service.ts
import { Injectable, BadRequestException, HttpStatus } from "@nestjs/common";
import { db } from "libs/db/drizzle.config";
import { users } from "libs/db/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";

@Injectable()
export class AuthRegisterService {
  async register(username: string, email: string, password: string) {
    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    if (existingEmail.length > 0) {
      throw new BadRequestException("Email sudah terdaftar");
    }

    const existingUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .execute();

    if (existingUsername.length > 0) {
      throw new BadRequestException("Username sudah terdaftar");
    }

    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      id,
      username,
      email,
      password: hashedPassword,
    });

    return {
      status: HttpStatus.OK,
      message: "Registrasi berhasil!",
      redirect: "/login",
    };
  }
}
