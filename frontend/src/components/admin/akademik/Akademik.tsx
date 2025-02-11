"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

interface Akademik {
  id: string;
  nama: string;
  nip: string;
  posisi: string;
}

interface AkademikProps {
  dataAkademik: Akademik[];
}

const posisiPriority = [
  "Kepala Sekolah",
  "Wakil Kepala Sekolah",
  "Tata Usaha",
  "Guru",
  "Staff",
];

export default function AkademikPage({ dataAkademik }: AkademikProps) {
  const router = useRouter();
  const GetPage = usePathname();
  const BaseUrl = `${GetPage}`;

  const [filteredAkademik, setFilteredAkademik] =
    useState<Akademik[]>(dataAkademik);
  const [selectedPosisi, setSelectedPosisi] = useState("");

  useEffect(() => {
    let sortedData = [...dataAkademik];

    sortedData.sort((a, b) => {
      const posA = posisiPriority.indexOf(a.posisi);
      const posB = posisiPriority.indexOf(b.posisi);

      if (posA !== posB) return posA - posB;
      if (a.posisi === "Guru" && b.posisi === "Guru") {
        return a.nama.localeCompare(b.nama);
      }
      return 0;
    });

    if (selectedPosisi) {
      sortedData = sortedData.filter((item) => item.posisi === selectedPosisi);
    }

    setFilteredAkademik(sortedData);
  }, [dataAkademik, selectedPosisi]);

  const handleAddData = () => {
    router.push(`${BaseUrl}/post`);
  };

  const handleEdit = async (id: string) => {
    router.push(`${BaseUrl}/update/${id}`);
  };

  const handleDelete = async (id: string, nama: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data " + nama + " akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/akademik/${id}`
          );

          if (response.status === 200) {
            Swal.fire("Terhapus!", "Data siswa berhasil dihapus.", "success");
            router.refresh();
          } else {
            throw new Error("Gagal menghapus data.");
          }
        } catch (error) {
          console.error("Error deleting siswa:", error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md">
      <div className="p-6">
        <h1 className="text-gray-900 text-lg font-semibold text-center mb-4">
          Tabel Akun Akademik
        </h1>
        <div className="flex justify-between items-center mb-4">
          <div className="sortir flex gap-4">
            <select
              className="p-2 border rounded-lg bg-[#3a3086] text-white"
              value={selectedPosisi}
              onChange={(e) => setSelectedPosisi(e.target.value)}
            >
              <option value="">Sort By Posisi (All)</option>
              {posisiPriority.map((pos, index) => (
                <option key={index} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddData}
            className="p-2 border rounded-lg bg-[#3a3086] text-white"
          >
            Add Akademik
          </button>
        </div>

        <div className="overflow-x-auto max-h-[410px] overflow-y-auto border-t border-gray-300">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
              <tr>
                <th className="px-6 py-3 border-b text-center text-lg">No</th>
                <th className="px-6 py-3 border-b text-center text-lg">Nama</th>
                <th className="px-6 py-3 border-b text-center text-lg">NIP</th>
                <th className="px-6 py-3 border-b text-center text-lg">
                  Posisi
                </th>
                <th className="px-6 py-3 border-b text-center text-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAkademik.map((akademik, index) => (
                <tr
                  key={akademik.id}
                  className={`border-b border-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {akademik.nama}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {akademik.nip}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {akademik.posisi}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg space-x-6">
                    <button
                      onClick={() => handleEdit(akademik.id)}
                      className="p-2 bg-blue-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-lg"
                      onClick={() => handleDelete(akademik.id, akademik.nama)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
