import { Injectable } from "@nestjs/common";
import { db } from "libs/db/drizzle.config";
import { dataabsensi } from "libs/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

type Siswa = {
  nis: string;
  nama: string;
  kelas: string;
  status: string;
};

type DataAbsensi = {
  id: string;
  tanggal: string;
  matapelajaran: string;
  data_siswa: Siswa[];
};

@Injectable()
export class AuthAbsensiSiswaService {
  async createAbsensi(absensiData: DataAbsensi[]) {
    const formattedData = absensiData.map((absensi) => ({
      id: randomUUID(),
      tanggal: absensi.tanggal,
      matapelajaran: absensi.matapelajaran,
      data_siswa: JSON.stringify(absensi.data_siswa),
      created_at: new Date().toISOString(),
    }));

    try {
      await db.insert(dataabsensi).values(formattedData);

      return {
        message: "Data absensi berhasil disimpan!",
        redirect: `/akademik/data/siswa/`,
      };
    } catch (error) {
      console.error("Error inserting absensi:", error);
      throw new Error("Gagal menyimpan data absensi.");
    }
  }

  async getAbsensiByTanggal(tanggal: string) {
    return await db
      .select()
      .from(dataabsensi)
      .where(eq(dataabsensi.tanggal, tanggal));
  }
}
