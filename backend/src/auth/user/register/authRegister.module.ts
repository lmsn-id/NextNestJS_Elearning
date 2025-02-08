// auth.module.ts
import { Module } from "@nestjs/common";
import { AuthRegisterService } from "./authRegister.service";
import { AuthRegisterController } from "./authRegister.controller";

@Module({
  providers: [AuthRegisterService],
  controllers: [AuthRegisterController],
  exports: [AuthRegisterService],
})
export class AuthRegisterModule {}
