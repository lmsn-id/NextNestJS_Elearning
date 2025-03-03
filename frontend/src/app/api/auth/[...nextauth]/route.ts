import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { Session } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          const { id, access_token, is_superuser, message, redirect, role } =
            res.data;

          const tokenValidation = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`,
            {
              params: { token: access_token },
            }
          );

          console.log("Response NestJS:", res.data);
          console.log("Token Validation:", tokenValidation.data);

          return {
            id,
            access_token,
            is_superuser,
            role,
            message,
            redirect,
            expired: tokenValidation.data.expired,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login failed");
          }
          throw new Error("An error occurred. Please try again.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.access_token;
        token.isSuperuser = user.is_superuser;
        token.role = user.role;
        token.message = user.message;
        token.redirect = user.redirect;
        token.expired = user.expired;
      }

      const currentTime = Date.now();
      const tokenExpirationTime = new Date(token.expired as string).getTime();

      if (tokenExpirationTime <= currentTime) {
        token.expiredFlag = true;
        return {};
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.accessToken) {
        return {} as Session;
      }

      session.user = {
        id: token.id,
        access_token: token.accessToken,
        is_superuser: token.isSuperuser,
        role: token.role,
        message: token.message,
        redirect: token.redirect,
        expired: token.expired ?? null,
      };

      return session;
    },
  },

  events: {
    async signOut({ token }) {
      if (!token?.accessToken) return;
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          data: { access_token: token.accessToken },
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Access token berhasil dihapus.");
      } catch (error) {
        console.error("Gagal menghapus access token:", error);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
