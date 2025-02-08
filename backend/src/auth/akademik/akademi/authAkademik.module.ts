import { Module } from "@nestjs/common";
import { AuthAkademikController } from "./authAkademik.controller";
import { AuthAkademikService } from "./authAkademik.service";

@Module({
  controllers: [AuthAkademikController],
  providers: [AuthAkademikService],
})
export class AuthAkademikModule {}
