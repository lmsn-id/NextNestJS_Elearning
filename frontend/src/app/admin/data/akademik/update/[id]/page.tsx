import { Suspense } from "react";
import UpdateAkademikClient from "@/components/admin/akademik/Update";
import Loading from "@/components/Loading";

interface Akademik {
  id: string;
  nip: string;
  nuptk: string | null;
  nama: string;
  kelas?: string;
  materi?: { value: string; kelasMateri: string[]; jadwal: string[] }[];
  posisi: string;
}

async function getAkademikData(id: string): Promise<Akademik | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/akademik/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) throw new Error("Gagal mengambil data akademik");
    return await response.json();
  } catch (error) {
    console.error("Error saat mengambil data akademik:", error);
    return null;
  }
}

export default async function UpdateAkademik({
  params,
}: {
  params: { id: string };
}) {
  const akademikData = await getAkademikData(params.id);

  if (!akademikData) {
    return <div>Error: Data akademik tidak ditemukan</div>;
  }

  return (
    <Suspense fallback={<Loading bgColor="bg-gray-100" isAbsolute />}>
      <UpdateAkademikClient akademikData={akademikData} />
    </Suspense>
  );
}
