import { Injectable } from "@nestjs/common";
import { db } from "libs/db/drizzle.config";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { users, datasiswa } from "libs/db/schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthSiswaService {
  private readonly db = db;

  async createSiswa(data: any) {
    if (!data.Nis || !data.Nama || !data.Jurusan || !data.Kelas) {
      throw new Error("NIS, Nama, Jurusan, dan Kelas wajib diisi!");
    }

    const siswaId = randomUUID();
    const hashedPassword = await bcrypt.hash(data.Nis, 10);

    await this.db.insert(datasiswa).values({
      id: siswaId,
      nis: data.Nis,
      nisn: data.Nisn || null,
      nama: data.Nama,
      agama: data.Agama || null,
      jurusan: data.Jurusan,
      kelas: data.Kelas,
      alamat: data.Alamat || null,
      no_telepon: data.NoTelepon || null,
      email: data.Email || null,
      jenis_kelamin: data.JenisKelamin || null,
      tempat_lahir: data.TempatLahir || null,
      tanggal_lahir: data.TanggalLahir || null,
    });

    await this.db.insert(users).values({
      id: siswaId,
      username: data.Nis,
      password: hashedPassword,
      email: data.Email || null,
      role: "siswa",
    });

    return {
      message: "Siswa berhasil ditambahkan",
      redirect: "/admin/data/siswa",
    };
  }

  async getAllSiswa() {
    return await this.db.select().from(datasiswa);
  }

  async getSiswaById(id: string) {
    const siswa = await this.db
      .select()
      .from(datasiswa)
      .where(eq(datasiswa.id, id));
    if (!siswa.length) throw new Error("Siswa tidak ditemukan");
    return siswa[0];
  }

  async updateSiswa(id: string, data: any) {
    if (!id) {
      throw new Error("ID siswa tidak boleh kosong!");
    }

    const siswaLama = await this.db
      .select()
      .from(datasiswa)
      .where(eq(datasiswa.id, id));

    if (!siswaLama.length) {
      throw new Error("Siswa tidak ditemukan!");
    }

    const validData: Record<string, any> = {};
    if (data.Nis) validData.nis = data.Nis;
    if (data.Nisn !== undefined) validData.nisn = data.Nisn;
    if (data.Nama) validData.nama = data.Nama;
    if (data.Agama !== undefined) validData.agama = data.Agama;
    if (data.Jurusan) validData.jurusan = data.Jurusan;
    if (data.Kelas) validData.kelas = data.Kelas;
    if (data.Alamat !== undefined) validData.alamat = data.Alamat;
    if (data.NoTelepon !== undefined) validData.no_telepon = data.NoTelepon;
    if (data.Email !== undefined) validData.email = data.Email;
    if (data.JenisKelamin !== undefined)
      validData.jenis_kelamin = data.JenisKelamin;
    if (data.TempatLahir !== undefined)
      validData.tempat_lahir = data.TempatLahir;
    if (data.TanggalLahir !== undefined)
      validData.tanggal_lahir = data.TanggalLahir;

    console.log("Data yang akan dikirim ke database:", validData);

    try {
      await this.db.transaction(async (tx) => {
        await tx.update(datasiswa).set(validData).where(eq(datasiswa.id, id));

        const userUpdateData: Record<string, any> = {};

        if (data.Nis && data.Nis !== siswaLama[0].nis) {
          userUpdateData.username = data.Nis;
          userUpdateData.password = await bcrypt.hash(data.Nis, 10);
        }

        if (data.Email !== undefined && data.Email !== siswaLama[0].email) {
          userUpdateData.email = data.Email;
        }

        if (Object.keys(userUpdateData).length > 0) {
          console.log("Mengupdate tabel users:", userUpdateData);
          await tx.update(users).set(userUpdateData).where(eq(users.id, id));
        }
      });

      return {
        message: "Siswa berhasil diperbarui",
        redirect: "/admin/data/siswa",
      };
    } catch (error) {
      console.error("Kesalahan saat update siswa:", error);
      throw new Error("Gagal memperbarui data siswa.");
    }
  }

  async deleteSiswa(id: string) {
    await this.db.transaction(async (tx) => {
      await tx.delete(users).where(eq(users.id, id));
      await tx.delete(datasiswa).where(eq(datasiswa.id, id));
    });

    return { message: "Siswa berhasil dihapus" };
  }
}
