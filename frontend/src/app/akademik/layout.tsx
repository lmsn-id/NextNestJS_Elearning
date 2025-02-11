// layout.tsx
import { SessionData } from "@lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import NavbarAkademik from "@/components/akademik/Navbar";
import SidebarAkademik from "@/components/akademik/Sidebar";
import { AkademikProvider } from "@/context/AkademikContext";
import axios from "axios";

export const metadata: Metadata = {
  title: "SMKN 5 Kab Tangerang || Akademik",
};

interface DataAkademik {
  id: string;
  nip: string;
  nuptk: string | null;
  nama: string;
  kelas?: string;
  materi?: { value: string; kelasMateri: string[] }[];
  posisi: string;
}

export default async function AkademikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await SessionData();

  const allowedPositions = [
    "Kepala Sekolah",
    "Wakil Kepala Sekolah",
    "Guru",
    "Staff",
    "Tata Usaha",
  ];

  if (
    !session ||
    !session.user.access_token ||
    !allowedPositions.includes(session.user.role ?? "")
  ) {
    redirect("/404");
  }

  const fetchDataAkademik = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/akademik/${session.user.id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error saat mengambil data akademik:", error);
      return null;
    }
  };

  const dataAkademik: DataAkademik | null = await fetchDataAkademik();

  return (
    <AkademikProvider dataAkademik={dataAkademik}>
      <div className="flex h-screen">
        <SidebarAkademik />
        <div className="flex-1 min-w-0">
          <NavbarAkademik dataAkademik={dataAkademik} />
          <main className="md:p-4 bg-gray-100 h-screen overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AkademikProvider>
  );
}
