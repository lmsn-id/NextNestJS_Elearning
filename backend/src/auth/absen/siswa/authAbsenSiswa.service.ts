import { Injectable } from "@nestjs/common";
import { db } from "libs/db/drizzle.config";
import { dataabsensi } from "libs/db/schema";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

type Siswa = {
  nis: string;
  nama: string;
  status: string;
};

type DataAbsensi = {
  id?: string;
  tanggal: string;
  kelas: string;
  matapelajaran: string;
  data_siswa: Siswa[];
};

@Injectable()
export class AuthAbsensiSiswaService {
  async createAbsensi(absensiData: DataAbsensi) {
    const existingAbsensi = await db
      .select()
      .from(dataabsensi)
      .where(
        and(
          eq(dataabsensi.tanggal, absensiData.tanggal),
          eq(dataabsensi.kelas, absensiData.kelas),
          eq(dataabsensi.matapelajaran, absensiData.matapelajaran)
        )
      );

    if (existingAbsensi.length > 0) {
      return {
        status: "error",
        message: "Kelas Sudah Di Absen",
      };
    }

    const formattedData = {
      id: randomUUID(),
      tanggal: absensiData.tanggal,
      kelas: absensiData.kelas,
      matapelajaran: absensiData.matapelajaran,
      data_siswa: JSON.stringify(absensiData.data_siswa),
      created_at: new Date().toISOString(),
    };

    try {
      await db.insert(dataabsensi).values(formattedData);

      return {
        message: "Data absensi berhasil disimpan!",
        redirect: `/akademik/data/siswa/`,
      };
    } catch (error) {
      throw new Error("Gagal menyimpan data absensi.");
    }
  }

  async getDataAbsensi(kelas: string, matapelajaran: string) {
    try {
      const decodedKelas = decodeURIComponent(kelas);

      const absensiData = await db
        .select()
        .from(dataabsensi)
        .where(
          and(
            eq(dataabsensi.kelas, decodedKelas),
            eq(dataabsensi.matapelajaran, matapelajaran)
          )
        );

      return absensiData.map((absensi) => ({
        id: absensi.id,
        tanggal: absensi.tanggal.split(" ")[0],
        kelas: absensi.kelas,
        matapelajaran: absensi.matapelajaran,
        data_siswa:
          typeof absensi.data_siswa === "string"
            ? JSON.parse(absensi.data_siswa)
            : absensi.data_siswa,
      }));
    } catch (error) {
      throw new Error("Gagal mengambil data absensi");
    }
  }

  async updateAbsensi(id: string, absensiData: DataAbsensi) {
    const formattedData = {
      id,
      tanggal: absensiData.tanggal,
      kelas: absensiData.kelas,
      matapelajaran: absensiData.matapelajaran,
      data_siswa: JSON.stringify(absensiData.data_siswa),
      updated_at: new Date().toISOString(),
    };

    try {
      await db
        .update(dataabsensi)
        .set(formattedData)
        .where(eq(dataabsensi.id, id));
    } catch (error) {
      throw new Error("Gagal memperbarui data absensi.");
    }
  }
}
