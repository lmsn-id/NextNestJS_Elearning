"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DataKelasSiswa {
  id: string;
  nama: string;
  nis: string;
  kelas: string;
}

interface AbsensiForm {
  status: Record<string, string>;
  mataPelajaran: string;
}

export default function DataKelasSiswaAkademik({
  dataKelas,
  mataPelajaran,
}: {
  dataKelas: DataKelasSiswa[];
  mataPelajaran: string;
}) {
  const { register, handleSubmit } = useForm<AbsensiForm>({
    defaultValues: {
      status: dataKelas.reduce<Record<string, string>>((acc, siswa) => {
        acc[siswa.id] = "H";
        return acc;
      }, {}),
      mataPelajaran: mataPelajaran,
    },
  });

  const [sortedData, setSortedData] = useState(
    [...dataKelas].sort((a, b) => a.nama.localeCompare(b.nama))
  );
  const [showAbsen, setShowAbsen] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: AbsensiForm) => {
    const absensiData = [
      {
        matapelajaran: data.mataPelajaran,
        tanggal: new Date().toISOString().split("T")[0],
        data_siswa: sortedData.map((siswa) => ({
          nis: siswa.nis,
          nama: siswa.nama,
          kelas: siswa.kelas,
          status: data.status[siswa.id] || "H",
        })),
      },
    ];

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/absensi`,
        absensiData
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message, {
          onClose: () => {
            router.push(response.data.redirect);
          },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Terjadi kesalahan saat mengirim absensi.");
        }
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="w-full bg-blue-400 p-4 rounded-t-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 flex-wrap">
          <div className="flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
            <input
              type="date"
              className="p-2 border rounded-md"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <select className="p-2 border rounded-md">
              <option value="">Tanggal Absen</option>
            </select>
          </div>
          <div className="flex">
            <button
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-blue-100"
              onClick={() => setShowAbsen(!showAbsen)}
            >
              Absen
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-bold text-gray-800 text-center mb-4">
        Data Siswa
      </h1>

      <div className="overflow-x-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="w-full border-collapse text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
              <tr>
                <th className="px-1 md:px-4 py-3 border-b text-center">No</th>
                <th className="px-1 md:px-4 py-3 border-b text-center">NIS</th>
                <th
                  className="px-1 md:px-4 py-3 border-b text-center cursor-pointer hover:text-blue-500"
                  onClick={() =>
                    setSortedData(
                      [...sortedData].sort((a, b) =>
                        a.nama.localeCompare(b.nama)
                      )
                    )
                  }
                >
                  Nama ⬍
                </th>
                <th className="px-1 md:px-4 py-3 border-b text-center">
                  Kelas
                </th>
                {showAbsen && (
                  <th className="px-4 py-3 border-b text-center">Absen</th>
                )}
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
                  <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm truncate max-w-[50px] overflow-hidden whitespace-nowrap">
                    {siswa.nis}
                  </td>
                  <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm truncate max-w-[60px] overflow-hidden whitespace-nowrap">
                    {siswa.nama}
                  </td>
                  <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                    {siswa.kelas}
                  </td>
                  {showAbsen && (
                    <td className="px-1 md:px-4 py-3 text-center font-semibold text-xs md:text-sm">
                      <div className="flex justify-between items-center">
                        {["H", "I", "A"].map((status) => (
                          <div
                            key={status}
                            className="flex flex-col gap-1 items-center justify-center"
                          >
                            <label htmlFor={`${siswa.id}-${status}`}>
                              {status}
                            </label>
                            <input
                              type="radio"
                              {...register(`status.${siswa.id}`)}
                              value={status}
                              defaultChecked={status === "H"}
                            />
                            <input
                              type="hidden"
                              {...register("mataPelajaran")}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {showAbsen && (
                <tr>
                  <td colSpan={5} className="text-right py-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
