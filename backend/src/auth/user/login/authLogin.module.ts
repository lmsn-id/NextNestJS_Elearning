import { Module } from "@nestjs/common";
import { AuthLoginService } from "./authLogin.service";
import { AuthLoginController } from "./authLogin.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: "elearning-secret",
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [AuthLoginController],
  providers: [AuthLoginService],
  exports: [AuthLoginService],
})
export class AuthLoginModule {}
