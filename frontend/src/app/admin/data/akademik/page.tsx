"use server";
import AkademikSA from "@/components/admin/akademik/Akademik";
import axios from "axios";

interface Akademik {
  id: string;
  nama: string;
  nip: string;
  posisi: string;
}

async function getData(): Promise<Akademik[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/akademik`
    );

    if (!response.data) throw new Error("Gagal mengambil data");
    return await response.data;
  } catch (error) {
    console.error("Error saat mengambil data:", error);
    return [];
  }
}

export default async function Akademik() {
  const dataAkademik = await getData();
  return <AkademikSA dataAkademik={dataAkademik} />;
}
