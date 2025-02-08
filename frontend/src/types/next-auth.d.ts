import "next-auth";

declare module "next-auth" {
  interface Session {
    refreshToken?: string;
    accessToken: string;
    user: {
      id: string;
      access_token?: string;
      is_superuser?: boolean;
      expired?: string;

      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    access_token: string;
    is_superuser: boolean;
    redirect: string;
    message: string;
    expired: string;
    role: string;
  }
}
