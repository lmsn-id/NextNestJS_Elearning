"use client";
import { useAkademik } from "@/context/AkademikContext";
import { useRouter, usePathname } from "next/navigation";

interface MateriItem {
  value: string;
  kelasMateri: string | string[];
  jadwal: string | string[];
}

export default function DataSiswaAkademik() {
  const { dataAkademik } = useAkademik();
  const router = useRouter();
  const pathname: string = usePathname();
  const baseUrl = pathname.split("/").slice(0, 4).join("/");
  console.log(dataAkademik);

  if (!dataAkademik || !dataAkademik.materi) {
    return <div>Loading...</div>;
  }

  const processedData = dataAkademik.materi
    .flatMap((materiItem: MateriItem) => {
      const kelasList = Array.isArray(materiItem.kelasMateri)
        ? materiItem.kelasMateri
        : [materiItem.kelasMateri];

      const jadwalList = Array.isArray(materiItem.jadwal)
        ? materiItem.jadwal
        : [materiItem.jadwal];

      return kelasList.map((kelas, index) => ({
        mataPelajaran: materiItem.value,
        kelas: kelas,
        jadwal: jadwalList[index] || "-",
      }));
    })
    .sort((a, b) => {
      const regex = /(\d+)\s*([A-Za-z\s]*)/;
      const matchA = a.kelas.match(regex);
      const matchB = b.kelas.match(regex);

      if (matchA && matchB) {
        const numA = parseInt(matchA[1]);
        const numB = parseInt(matchB[1]);
        const textA = matchA[2].trim();
        const textB = matchB[2].trim();

        if (textA === textB) return numA - numB;
        return textA.localeCompare(textB);
      }
      return a.kelas.localeCompare(b.kelas);
    });

  const handleShowData = (kelas: string) => {
    router.push(`${baseUrl}/${kelas}`);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg">
        <div className="p-4 md:p-8 flex flex-col gap-8">
          <div className="header mb-4">
            <h1 className="text-lg md:text-xl font-bold text-gray-800 text-center">
              Data Siswa
            </h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[max-content] border-collapse text-left text-xs md:text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] md:text-xs font-medium">
                <tr>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center">
                    No
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center">
                    Mata Pelajaran
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center">
                    Kelas
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center">
                    Jadwal
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center">
                    Gabung
                  </th>
                </tr>
              </thead>
              <tbody>
                {processedData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm">
                      {index + 1}
                    </td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm">
                      {item.mataPelajaran}
                    </td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm">
                      {item.kelas}
                    </td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm">
                      {item.jadwal}
                    </td>
                    <td
                      onClick={() => handleShowData(item.kelas)}
                      className="px-1 md:px-6 text-blue-500 hover:text-green-500 py-2 cursor-pointer md:py-3 text-center font-semibold text-xs md:text-sm"
                    >
                      Lihat
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
