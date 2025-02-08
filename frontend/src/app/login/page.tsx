import { SessionData } from "@lib/auth";
import LoginPage from "@/components/login/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMKN 5 Kab Tangerang | Login",
};

export default async function Page() {
  const session = await SessionData();

  return <LoginPage session={session} />;
}
