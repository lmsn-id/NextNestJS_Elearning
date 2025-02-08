import { Controller, Post, Body, Get, Query, Delete } from "@nestjs/common";
import { AuthLoginService } from "./authLogin.service";

@Controller("auth")
export class AuthLoginController {
  constructor(private readonly authService: AuthLoginService) {}

  @Post("login")
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Delete("logout")
  async logout(@Body() body: { access_token: string }) {
    return this.authService.logout(body.access_token);
  }

  @Get("validate-token")
  async validateToken(@Query("token") token: string) {
    return this.authService.validateToken(token);
  }
}
