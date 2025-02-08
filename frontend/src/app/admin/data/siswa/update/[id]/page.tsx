import { Suspense } from "react";
import UpdateSiswaClient from "@/components/admin/siswa/Update";

interface Siswa {
  id: string;
  nis: string;
  nisn: string | null;
  nama: string;
  jenis_kelamin: string | null;
  tanggal_lahir: string | null;
  tempat_lahir: string | null;
  agama: string | null;
  alamat: string | null;
  email: string | null;
  no_telepon: string | null;
  jurusan: string;
  kelas: string;
}

async function getSiswaData(id: string): Promise<Siswa | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/siswa/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) throw new Error("Gagal mengambil data siswa");
    return await response.json();
  } catch (error) {
    console.error("Error saat mengambil data siswa:", error);
    return null;
  }
}

export default async function UpdateSiswa({
  params,
}: {
  params: { id: string };
}) {
  const siswaData = await getSiswaData(params.id);

  if (!siswaData) {
    return <div>Error: Data siswa tidak ditemukan</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateSiswaClient siswaData={siswaData} />
    </Suspense>
  );
}
