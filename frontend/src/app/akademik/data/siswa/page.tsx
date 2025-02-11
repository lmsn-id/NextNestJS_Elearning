"use client";
import { useAkademik } from "@/context/AkademikContext";
import { useRouter, usePathname } from "next/navigation";

export default function DataSiswaAkademik() {
  const { dataAkademik } = useAkademik();
  const router = useRouter();
  const pathname = usePathname();
  const baseUrl = pathname.split("/").slice(0, 4).join("/");

  const processedData = dataAkademik?.materi
    ?.flatMap(
      (materiItem: { value: string; kelasMateri: string | string[] }) => {
        const kelasList =
          typeof materiItem.kelasMateri === "string"
            ? materiItem.kelasMateri.split(", ")
            : [];

        return kelasList.map((kelas) => ({
          mataPelajaran: materiItem.value,
          kelas: kelas,
        }));
      }
    )
    ?.sort((a, b) => {
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
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    No
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                    Mata Pelajaran
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                    Kelas
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                    Pertemuan
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                    Jadwal
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                    Hadir
                  </th>
                  <th className="px-1 md:px-6 py-2 md:py-3 border-b text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                    Gabung
                  </th>
                </tr>
              </thead>
              <tbody>
                {processedData?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm">
                      {index + 1}
                    </td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                      {item.mataPelajaran}
                    </td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none">
                      {item.kelas}
                    </td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm"></td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none"></td>
                    <td className="px-1 md:px-6 py-2 md:py-3 text-center font-semibold text-xs md:text-sm"></td>
                    <td
                      onClick={() => handleShowData(item.kelas)}
                      className="px-1 md:px-6 text-blue-500 hover:text-green-500 py-2 cursor-pointer md:py-3 text-center font-semibold text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px] md:max-w-none"
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
