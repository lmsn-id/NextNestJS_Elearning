// src/app/admin/layout.tsx
import { SessionData } from "@lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "@/components/SessionProvider";
import SidebarAdmin from "@/components/admin/Sidebar";
import NavbarAdmin from "@/components/admin/Navbar";

export const metadata = {
  title: "SMKN 5 Kab Tangerang | Admin",
};

export default async function AdminPageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await SessionData();

  if (
    !session ||
    !session.user?.is_superuser ||
    session.user.role !== "superadmin"
  ) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <section className="m-0 font-sans antialiased font-normal text-lg leading-default bg-gray-50 text-slate-500 relative h-screen">
        <div className="absolute top-0 left-0 w-full bg-[#3a3086] min-h-72 z-0"></div>
        <SidebarAdmin />
        <div className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-64 rounded-xl overflow-hidden">
          <NavbarAdmin />
          <div
            className="p-6 overflow-y-auto h-[calc(100vh-4rem)]"
            style={{
              maxHeight: "calc(100vh - 4rem)",
            }}
          >
            {children}
          </div>
        </div>
      </section>
    </SessionProvider>
  );
}
