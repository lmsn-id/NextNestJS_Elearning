"use client";

import { useState } from "react";

interface DataKelasSiswa {
  id: string;
  nama: string;
  nis: string;
  kelas: string;
  jurusan: string;
}

export default function DataKelasSiswaAkademik({
  dataKelas,
}: {
  dataKelas: DataKelasSiswa[];
}) {
  const [sortedData, setSortedData] = useState(
    [...dataKelas].sort((a, b) => a.nama.localeCompare(b.nama))
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold text-gray-800 text-center mb-4">
        Data Siswa
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
            <tr>
              <th className="px-1 md:px-4 py-3 border-b text-center">No</th>
              <th className="px-1 md:px-4 py-3 border-b text-center">NIS</th>
              <th
                className="px-1 md:px-4 py-3 border-b text-center cursor-pointer hover:text-blue-500"
                onClick={() =>
                  setSortedData(
                    [...sortedData].sort((a, b) => a.nama.localeCompare(b.nama))
                  )
                }
              >
                Nama ⬍
              </th>
              <th className="px-1 md:px-4 py-3 border-b text-center">Kelas</th>
              <th className="px-1 md:px-4 py-3 border-b text-center">
                Jurusan
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((siswa, index) => (
              <tr
                key={siswa.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                  {index + 1}
                </td>
                <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                  {siswa.nis}
                </td>
                <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                  {siswa.nama}
                </td>
                <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                  {siswa.kelas}
                </td>
                <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                  {siswa.jurusan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
