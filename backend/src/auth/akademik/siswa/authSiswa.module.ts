import { Module } from "@nestjs/common";
import { AuthSiswaService } from "./authSiswa.service";
import { AuthSiswaController } from "./authSiswa.controller";

@Module({
  controllers: [AuthSiswaController],
  providers: [AuthSiswaService],
})
export class AuthSiswaModule {}
