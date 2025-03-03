"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useAkademik } from "@/context/AkademikContext";
import { useReactToPrint } from "react-to-print";

export default function Jadwal() {
  const { dataAkademik } = useAkademik();
  const printRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const jadwalData = dataAkademik?.materi || [];

  const formattedData = jadwalData.flatMap((item) => {
    if (!Array.isArray(item.kelasMateri) || !Array.isArray(item.jadwal)) {
      return [];
    }

    return item.kelasMateri.map((kelas: string, index: number) => {
      const jadwalMap: Record<string, string> = {};

      if (index < item.jadwal.length) {
        const match = item.jadwal[index].match(
          /(\w+) (\d{2}:\d{2} - \d{2}:\d{2})/
        );
        if (match) {
          const hari = match[1];
          const waktu = match[2];

          if (hariList.includes(hari)) {
            jadwalMap[hari] = waktu;
          }
        }
      }

      return {
        mataPelajaran: item.value,
        kelas,
        jadwal: jadwalMap,
      };
    });
  });

  useEffect(() => {
    if (printRef.current) {
      console.log("✅ printRef berhasil terhubung:", printRef.current);
      setIsReady(true);
    }
  }, [printRef]);

  const handlePrint = useReactToPrint({
    documentTitle: "Jadwal_Pelajaran",
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 1cm;
      }
      body {
        font-size: 12px;
        padding: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 5px;
        text-align: center;
      }
    `,
  });

  return (
    <>
      <div className="w-full bg-white rounded-lg p-4 md:p-8">
        <div ref={printRef} className="p-4 bg-white">
          <div className="header mb-4">
            <div className="flex justify-between items-center">
              <div className="logo">
                <Image
                  src="/image/LOGO-NEW-SMKN5.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-12 h-16"
                />
              </div>
              <div className="title text-center">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  Jadwal Pelajaran Kurikulum Merdeka <br />
                  SMKN 5 Kabupaten Tangerang <br />
                  Tahun Ajaran 2024/2025
                </h1>
              </div>
              <div className="logo">
                <Image
                  src="/image/merdekamengajar.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className=" w-32 "
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[max-content] border-collapse border border-gray-300 text-xs md:text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] md:text-xs font-medium">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Kelas
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Mata Pelajaran
                  </th>
                  {hariList.map((hari) => (
                    <th
                      key={hari}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {hari}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formattedData.length > 0 ? (
                  formattedData.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {item.kelas}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.mataPelajaran}
                      </td>
                      {hariList.map((hari) => (
                        <td
                          key={hari}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {item.jadwal[hari] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center border border-gray-300 px-4 py-2"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={
              isReady
                ? () => handlePrint()
                : () => console.log("⏳ Menunggu printRef tersedia...")
            }
            className={`font-bold py-2 px-4 rounded ${
              isReady
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isReady}
          >
            {isReady ? "Print Jadwal" : "Loading..."}
          </button>
        </div>
      </div>
    </>
  );
}
