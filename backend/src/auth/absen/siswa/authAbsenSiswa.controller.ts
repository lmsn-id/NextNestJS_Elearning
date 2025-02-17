import { Controller, Body, Post, Get, Param } from "@nestjs/common";
import { AuthAbsensiSiswaService } from "./authAbsenSiswa.service";

@Controller("auth")
export class AuthAbsenSiswaController {
  constructor(private readonly authService: AuthAbsensiSiswaService) {}

  @Post("absensi")
  async createAbsensi(@Body() data: any) {
    return this.authService.createAbsensi(data);
  }

  @Get("absensi/:tanggal")
  async getAbsensiByTanggal(@Param("tanggal") tanggal: string) {
    return this.authService.getAbsensiByTanggal(tanggal);
  }
}
