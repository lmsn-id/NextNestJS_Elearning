// auth-siswa.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { AuthSiswaService } from "./authSiswa.service";

@Controller("auth")
export class AuthSiswaController {
  constructor(private readonly authSiswaService: AuthSiswaService) {}

  @Post("add/siswa")
  async createSiswa(@Body() data: any) {
    return this.authSiswaService.createSiswa(data);
  }

  @Get("siswa")
  async getAllSiswa() {
    return this.authSiswaService.getAllSiswa();
  }

  @Get("siswa/:id")
  async getSiswaById(@Param("id") id: string) {
    return this.authSiswaService.getSiswaById(id);
  }

  @Put("siswa/:id")
  async updateSiswa(@Param("id") id: string, @Body() data: any) {
    return this.authSiswaService.updateSiswa(id, data);
  }

  @Delete("siswa/:id")
  async deleteSiswa(@Param("id") id: string) {
    return this.authSiswaService.deleteSiswa(id);
  }
}
