import { Module } from "@nestjs/common";
import { AuthAbsensiSiswaService } from "./authAbsenSiswa.service";
import { AuthAbsenSiswaController } from "./authAbsenSiswa.controller";

@Module({
  controllers: [AuthAbsenSiswaController],
  providers: [AuthAbsensiSiswaService],
})
export class AuthAbsenSiswaModule {}
