"use server";
import SiswaClient from "@/components/admin/siswa/Siswa";
interface Siswa {
  id: string;
  nis: string;
  nama: string;
  jurusan: string;
  kelas: string;
}
async function getData(): Promise<Siswa[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/siswa`
    );
    if (!response.ok) throw new Error("Gagal mengambil data");
    return await response.json();
  } catch (error) {
    console.error("Error saat mengambil data:", error);
    return [];
  }
}
export default async function Siswa() {
  const dataSiswa = await getData();
  return <SiswaClient dataSiswa={dataSiswa} />;
}
