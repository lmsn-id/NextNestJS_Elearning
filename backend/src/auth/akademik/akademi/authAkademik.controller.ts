import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Param,
  Put,
} from "@nestjs/common";
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

  @Get("akademik/:id")
  async getDataAkademikByID(@Param("id") id: string) {
    return this.authService.getDataAkademikByID(id);
  }

  @Put("update/:id")
  async updateSiswa(@Param("id") id: string, @Body() data: any) {
    return this.authService.updateAkademik(id, data);
  }

  @Delete("akademik/:id")
  async deleteSiswa(@Param("id") id: string) {
    return this.authService.deleteDataAkademik(id);
  }
}
