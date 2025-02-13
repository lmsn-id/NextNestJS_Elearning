import { Suspense } from "react";
import DataKelasSiswaAkademik from "@/components/akademik/DataSiswa";
import axios, { AxiosError } from "axios";
import Loading from "@/components/Loading";

interface DataKelasSiswa {
  id: string;
  nis: string;
  nama: string;
  kelas: string;
  jurusan: string;
}

async function getDataKelasSiswa(
  kelasJurusan: string
): Promise<DataKelasSiswa[]> {
  try {
    const formattedKelasJurusan = encodeURIComponent(kelasJurusan);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/data/siswa/${formattedKelasJurusan}`;

    const response = await axios.get(url);

    if (!response.data) throw new Error("Gagal mengambil data");

    return response.data || [];
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function DataKelas({
  params,
}: {
  params: { kelas: string };
}) {
  const dataKelas = await getDataKelasSiswa(params.kelas);

  if (!dataKelas) {
    return <div>Error: Data kelas siswa tidak ditemukan</div>;
  }

  return (
    <>
      <Suspense fallback={<Loading bgColor="bg-gray-100" isAbsolute />}>
        <DataKelasSiswaAkademik dataKelas={dataKelas} />
      </Suspense>
    </>
  );
}
