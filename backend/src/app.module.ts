import { Module } from "@nestjs/common";
import { DatabaseModule } from "libs/db/database.module";
import { AuthRegisterModule } from "./auth/user/register/authRegister.module";
import { AuthLoginModule } from "./auth/user/login/authLogin.module";
import { AuthSiswaModule } from "./auth/akademik/siswa/authSiswa.module";
import { AuthAkademikModule } from "./auth/akademik/akademi/authAkademik.module";
import { AuthAbsenSiswaModule } from "./auth/absen/siswa/authAbsenSiswa.module";

@Module({
  imports: [
    DatabaseModule,
    AuthRegisterModule,
    AuthLoginModule,
    AuthSiswaModule,
    AuthAkademikModule,
    AuthAbsenSiswaModule,
  ],
})
export class AppModule {}
