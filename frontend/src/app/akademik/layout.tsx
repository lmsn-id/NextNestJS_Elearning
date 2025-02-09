// layout.tsx
import { SessionData } from "@lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "@/components/SessionProvider";
import type { Metadata } from "next";
import NavbarAkademik from "@/components/akademik/Navbar";
import SidebarAkademik from "@/components/akademik/Sidebar";

export const metadata: Metadata = {
  title: "SMKN 5 Kab Tangerang || Akademik",
};

export default async function AkademikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await SessionData();

  const allowedPositions = ["Kepala Sekolah", "Guru", "Staff", "Tata Usaha"];

  if (
    !session ||
    !session.user.access_token ||
    !allowedPositions.includes(session.user.role ?? "")
  ) {
    redirect("/404");
  }

  return (
    <SessionProvider session={session}>
      <div className="flex overflow-hidden h-screen">
        <SidebarAkademik />
        <div className="flex-1">
          <NavbarAkademik session={session} />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
