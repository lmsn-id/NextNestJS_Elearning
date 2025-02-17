import { Controller, Body, Post, Get, Query, Put, Param } from "@nestjs/common";
import { AuthAbsensiSiswaService } from "./authAbsenSiswa.service";

@Controller("auth")
export class AuthAbsenSiswaController {
  constructor(private readonly authService: AuthAbsensiSiswaService) {}

  @Post("absensi")
  async createAbsensi(@Body() data: any) {
    return this.authService.createAbsensi(data);
  }

  @Get("absensi")
  async getDataAbsensi(
    @Query("kelas") kelas: string,
    @Query("matapelajaran") matapelajaran: string
  ) {
    return this.authService.getDataAbsensi(kelas, matapelajaran);
  }

  @Put("absensi/:id")
  async updateAbsensi(@Param("id") id: string, @Body() absensiData) {
    try {
      await this.authService.updateAbsensi(id, absensiData);
      return {
        message: "Data absensi berhasil diperbarui!",
        redirect: `/akademik/data/siswa/`,
      };
    } catch (error) {
      throw new Error("Gagal memperbarui data absensi.");
    }
  }
}
