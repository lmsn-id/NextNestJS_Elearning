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

  async updateAkademik(id: string, data: any) {
    if (!id) {
      throw new Error("ID akademik tidak boleh kosong!");
    }

    const akademikLama = await this.db
      .select()
      .from(dataakademik)
      .where(eq(dataakademik.id, id));

    if (!akademikLama.length) {
      throw new Error("Data akademik tidak ditemukan!");
    }

    const posisiLama = akademikLama[0].posisi;
    const posisiBaru = data.posisi;

    const validData: Record<string, any> = {};
    if (data.nip) validData.nip = data.nip;
    if (data.nuptk !== undefined) validData.nuptk = data.nuptk;
    if (data.nama) validData.nama = data.nama;
    if (data.kelas !== undefined) validData.kelas = data.kelas;
    if (data.posisi) validData.posisi = data.posisi;

    if (posisiLama === "Guru" && posisiBaru !== "Guru") {
      validData.kelas = null;
      validData.materi = null;
    }

    if (data.materi !== undefined && data.posisi === "Guru") {
      if (!Array.isArray(data.materi)) {
        throw new Error("Format materi tidak valid!");
      }
      validData.materi = JSON.stringify(data.materi);
    }

    if (Object.keys(validData).length === 0) {
      throw new Error("Tidak ada data yang diperbarui!");
    }

    try {
      await this.db.transaction(async (tx) => {
        await tx
          .update(dataakademik)
          .set(validData)
          .where(eq(dataakademik.id, id));

        const userUpdateData: Record<string, any> = {};
        if (data.nip && data.nip !== akademikLama[0].nip) {
          userUpdateData.username = data.nip;
          userUpdateData.password = await bcrypt.hash(data.nip, 10);
        }
        if (data.email !== undefined && data.email !== akademikLama[0].email) {
          userUpdateData.email = data.email;
        }

        if (posisiBaru && posisiBaru !== posisiLama) {
          userUpdateData.role = posisiBaru;
        }

        if (
          Object.keys(userUpdateData).length > 0 ||
          posisiBaru !== posisiLama
        ) {
          await tx.update(users).set(userUpdateData).where(eq(users.id, id));
        }
      });

      return {
        message: "Data akademik berhasil diperbarui",
        redirect: "/admin/data/akademik",
      };
    } catch (error) {
      console.error("Kesalahan saat update akademik:", error);
      throw new Error("Gagal memperbarui data akademik.");
    }
  }

  async getDataAkademikByID(id: string) {
    const siswa = await this.db
      .select()
      .from(dataakademik)
      .where(eq(dataakademik.id, id));
    if (!siswa.length) throw new Error("Data akademik tidak ditemukan");
    return siswa[0];
  }

  async deleteDataAkademik(id: string) {
    await this.db.transaction(async (tx) => {
      await tx.delete(users).where(eq(users.id, id));
      await tx.delete(dataakademik).where(eq(dataakademik.id, id));
    });

    return { message: "Data akademik berhasil dihapus" };
  }
}
