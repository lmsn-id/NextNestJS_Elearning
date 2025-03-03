"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DataKelasSiswa {
  id: string;
  nama: string;
  nis: string;
  kelas: string;
  status: string;
}

interface AbsensiForm {
  status: Record<string, string>;
  mataPelajaran: string;
}

interface DataAbsensi {
  id: string;
  tanggal: string;
  kelas: string;
  matapelajaran: string;
  data_siswa: DataKelasSiswa[];
}

export default function DataKelasSiswaAkademik({
  dataKelas,
  mataPelajaran,
  dataAbsensi,
}: {
  dataKelas: DataKelasSiswa[];
  mataPelajaran: string;
  dataAbsensi: DataAbsensi[];
}) {
  const { register, handleSubmit, setValue } = useForm<AbsensiForm>({
    defaultValues: {
      status: dataKelas.reduce<Record<string, string>>((acc, siswa) => {
        acc[siswa.nis] = siswa.status || "H";
        return acc;
      }, {}),
      mataPelajaran: mataPelajaran,
    },
  });

  const [sortedData, setSortedData] = useState(
    [...dataKelas].sort((a, b) => a.nama.localeCompare(b.nama))
  );
  const [showAbsen, setShowAbsen] = useState(false);
  const [selectedAbsensi, setSelectedAbsensi] = useState<DataAbsensi | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (selectedAbsensi) {
      const status = selectedAbsensi.data_siswa.reduce<Record<string, string>>(
        (acc, siswa) => {
          acc[siswa.nis] = siswa.status;
          return acc;
        },
        {}
      );
      setValue("status", status);
    }
  }, [selectedAbsensi, setValue]);

  const onSubmit = async (data: AbsensiForm) => {
    let absensiData: DataAbsensi = {
      id: selectedAbsensi ? selectedAbsensi.id : "",
      tanggal: new Date().toISOString().split("T")[0],
      kelas: sortedData.length > 0 ? sortedData[0].kelas : "",
      matapelajaran: data.mataPelajaran,
      data_siswa: sortedData.map((siswa) => ({
        id: siswa.id,
        nis: siswa.nis,
        nama: siswa.nama,
        kelas: siswa.kelas,
        status: data.status[siswa.nis] || "H",
      })),
    };

    if (selectedAbsensi) {
      absensiData = { ...absensiData, id: selectedAbsensi.id };
    }

    try {
      const isEdit = !!selectedAbsensi;
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/absensi/${selectedAbsensi.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/absensi`;

      const method = isEdit ? "put" : "post";

      const response = await axios[method](url, absensiData);

      if (response.data.status === "error") {
        toast.error(response.data.message, {
          autoClose: 2000,
        });

        return;
      }

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = dataAbsensi.find((absensi) => absensi.id === selectedId);
    setSelectedAbsensi(selected || null);
    setShowAbsen(!!selected);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="w-full bg-blue-400 p-4 rounded-t-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 flex-wrap">
          <div className="flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
            <input
              type="date"
              className="p-2 border rounded-md bg-white"
              defaultValue={new Date().toISOString().split("T")[0]}
              disabled
            />
            <select
              className="p-2 border rounded-md"
              onChange={handleSelectChange}
            >
              <option value="">Tanggal Absen</option>
              {dataAbsensi.map((absensi) => (
                <option key={absensi.id} value={absensi.id}>
                  {new Date(absensi.tanggal).toLocaleDateString("id-ID")}
                </option>
              ))}
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
                            <label htmlFor={`${siswa.nis}-${status}`}>
                              {status}
                            </label>
                            <input
                              type="radio"
                              {...register(`status.${siswa.nis}`)}
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
