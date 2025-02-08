import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "libs/db/drizzle.config";
import { users, accsestoken } from "libs/db/schema";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";

@Injectable()
export class AuthLoginService {
  async validateUser(username: string, password: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      throw new NotFoundException("Akun belum terdaftar");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Password salah");
    }

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    const tokenValue = randomBytes(32).toString("hex");

    const expired_At = this.getMidnightTimestamp();

    await db.insert(accsestoken).values({
      id: randomBytes(16).toString("hex"),
      user_id: user.id,
      token: tokenValue,
      expired: expired_At,
    });

    const roleRedirects: Record<string, string> = {
      superadmin: "/admin",
      siswa: "/e-learning",
      akademik: "/akademik",
    };

    return {
      id: user.id,
      access_token: tokenValue,
      is_superuser: user.is_superuser,
      role: user.role,
      message: "Login berhasil",
      redirect:
        user.is_superuser && user.role === "superadmin"
          ? "/admin"
          : roleRedirects[user.role] || "/",
    };
  }

  private getMidnightTimestamp(): string {
    const now = new Date();
    now.setHours(24, 0, 0, 0);
    return now.toISOString();
  }

  async logout(accessToken: string) {
    console.log("Mencari token:", accessToken);

    const tokenData = await db.query.accsestoken.findFirst({
      where: eq(accsestoken.token, accessToken),
    });

    if (!tokenData) {
      console.log("Token tidak ditemukan di database!");
      throw new NotFoundException("Token tidak ditemukan atau sudah dihapus.");
    }

    await db.delete(accsestoken).where(eq(accsestoken.token, accessToken));

    console.log("Token berhasil dihapus dari database!");
    return {
      message: "Logout berhasil, token telah dihapus.",
    };
  }
  async validateToken(accessToken: string) {
    const tokenData = await db.query.accsestoken.findFirst({
      where: eq(accsestoken.token, accessToken),
    });

    if (!tokenData) {
      throw new UnauthorizedException("Token tidak valid");
    }

    return {
      expired: tokenData.expired,
    };
  }
}
