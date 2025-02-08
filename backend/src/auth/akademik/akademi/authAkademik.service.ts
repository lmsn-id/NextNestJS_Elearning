import { Injectable } from "@nestjs/common";
import { db } from "libs/db/drizzle.config";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { users, dataakademik } from "libs/db/schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthAkademikService {
  private readonly db = db;

  async createAkademik(data: any) {
    if (!data.Nip) {
      throw new Error("NIP wajib diisi!");
    }
    if (!data.Nama || !data.Posisi) {
      throw new Error("Nama dan Posisi wajib diisi!");
    }
    if (
      data.Posisi === "Guru" &&
      (!Array.isArray(data.Materi) ||
        data.Materi.some((m) => !m.value || !m.kelasMateri.length))
    ) {
      throw new Error("Materi dan kelas wajib diisi untuk guru!");
    }

    const akademikId = randomUUID();
    const username = data.Nip;
    const hashedPassword = await bcrypt.hash(data.Nip, 10);

    await this.db.insert(users).values({
      id: akademikId,
      username,
      password: hashedPassword,
      email: data.Email || null,
      role: data.Posisi,
    });

    const transformedMateri =
      data.Posisi === "Guru"
        ? JSON.stringify(
            data.Materi.map(({ value, kelasMateri }) => ({
              value,
              kelasMateri,
            }))
          )
        : null;

    await this.db.insert(dataakademik).values({
      id: akademikId,
      nuptk: data.Nuptk || null,
      nip: data.Nip,
      nama: data.Nama,
      jenis_kelamin: data.JenisKelamin || null,
      tempat_lahir: data.TempatLahir || null,
      tanggal_lahir: data.TanggalLahir || null,
      agama: data.Agama || null,
      alamat: data.Alamat || null,
      no_telepon: data.NoTelepon || null,
      email: data.Email || null,
      posisi: data.Posisi,
      kelas: data.Kelas || null,
      materi: transformedMateri,
    });

    return {
      message: "Data akademik berhasil ditambahkan",
      redirect: "/admin/data/akademik",
    };
  }

  async getAllDataAkademik() {
    return this.db.select().from(dataakademik);
  }

  async deleteDataAkademik(id: string) {
    await this.db.transaction(async (tx) => {
      await tx.delete(users).where(eq(users.id, id));
      await tx.delete(dataakademik).where(eq(dataakademik.id, id));
    });

    return { message: "Data akademik berhasil dihapus" };
  }
}
