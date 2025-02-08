// auth.controller.ts
import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthRegisterService } from "./authRegister.service";

@Controller("auth")
export class AuthRegisterController {
  constructor(private readonly authService: AuthRegisterService) {}

  @Post("register")
  async register(
    @Body() body: { username: string; email: string; password: string }
  ) {
    try {
      const result = await this.authService.register(
        body.username,
        body.email,
        body.password
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
