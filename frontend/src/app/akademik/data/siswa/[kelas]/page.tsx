import { Suspense } from "react";
import DataKelasSiswaAkademik from "@/components/akademik/DataSiswa";
import axios, { AxiosError } from "axios";
import Loading from "@/components/Loading";
interface DataKelasSiswa {
  id: string;
  nama: string;
  nis: string;
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

    return response.data.map((siswa: DataKelasSiswa) => ({
      id: siswa.id,
      nama: siswa.nama,
      nis: siswa.nis,
      kelas: `${siswa.kelas} ${siswa.jurusan}`,
    }));
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function DataKelas({
  params,
  searchParams,
}: {
  params: { kelas: string };
  searchParams: { mapel?: string };
}) {
  const dataKelas = await getDataKelasSiswa(params.kelas);
  const mataPelajaran = searchParams.mapel || "";

  if (!dataKelas.length) {
    return <div>Error: Data kelas siswa tidak ditemukan</div>;
  }

  return (
    <Suspense fallback={<Loading bgColor="bg-gray-100" isAbsolute />}>
      <DataKelasSiswaAkademik
        dataKelas={dataKelas}
        mataPelajaran={mataPelajaran}
      />
    </Suspense>
  );
}
