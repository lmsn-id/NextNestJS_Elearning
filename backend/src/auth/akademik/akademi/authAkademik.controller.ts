import { Controller, Body, Post, Get, Delete, Param } from "@nestjs/common";
import { AuthAkademikService } from "./authAkademik.service";

@Controller("auth")
export class AuthAkademikController {
  constructor(private readonly authService: AuthAkademikService) {}

  @Post("add/akademik")
  async createAkademik(@Body() data: any) {
    return this.authService.createAkademik(data);
  }

  @Get("akademik")
  async getAllDataAkademik() {
    return this.authService.getAllDataAkademik();
  }

  @Delete("akademik/:id")
  async deleteSiswa(@Param("id") id: string) {
    return this.authService.deleteDataAkademik(id);
  }
}
