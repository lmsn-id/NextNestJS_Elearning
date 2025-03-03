"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

interface Siswa {
  id: string;
  nis: string;
  nama: string;
  jurusan: string;
  kelas: string;
}

interface SiswaClientProps {
  dataSiswa: Siswa[];
}

export default function SiswaClient({ dataSiswa }: SiswaClientProps) {
  const router = useRouter();
  const GetPage = usePathname();
  const BaseUrl = `${GetPage}`;
  const [filteredSiswa, setFilteredSiswa] = useState<Siswa[]>(dataSiswa);
  const [jurusanList, setJurusanList] = useState<string[]>([]);
  const [kelasList, setKelasList] = useState<string[]>([]);
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const jurusanSet = new Set<string>(dataSiswa.map((siswa) => siswa.jurusan));
    const kelasSet = new Set<string>(dataSiswa.map((siswa) => siswa.kelas));

    setJurusanList([...jurusanSet].sort());
    setKelasList([...kelasSet].sort((a, b) => parseInt(a) - parseInt(b)));
    setFilteredSiswa(dataSiswa);
  }, [dataSiswa]);

  const sortedSiswa = filteredSiswa
    .filter((siswa) =>
      selectedJurusan ? siswa.jurusan === selectedJurusan : true
    )
    .filter((siswa) => (selectedKelas ? siswa.kelas === selectedKelas : true))
    .sort((a, b) => {
      if (a.jurusan < b.jurusan) return -1;
      if (a.jurusan > b.jurusan) return 1;
      return (
        parseInt(a.kelas) - parseInt(b.kelas) || a.nama.localeCompare(b.nama)
      );
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSiswa.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedSiswa.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = (id: string) => {
    router.push(`${BaseUrl}/update/${id}`);
  };

  const handleDelete = async (id: string, nama: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data siswa " + nama + " akan dihapus!",
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
            `${process.env.NEXT_PUBLIC_API_URL}/auth/siswa/${id}`
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
      <div className="p-6 min-h-[calc(100vh-8rem)] flex flex-col justify-between">
        <div>
          <h1 className="text-gray-900 text-lg font-semibold text-center mb-4">
            Tabel Data Siswa
          </h1>
          <div className="flex justify-between items-center mb-4">
            <div className="sortir flex gap-4">
              <select
                className="p-2 border rounded-lg bg-[#3a3086] text-white"
                value={selectedJurusan}
                onChange={(e) => setSelectedJurusan(e.target.value)}
              >
                <option value="">Sort By Jurusan (All)</option>
                {jurusanList.map((jurusanItem, index) => (
                  <option key={index} value={jurusanItem}>
                    {jurusanItem}
                  </option>
                ))}
              </select>

              <select
                className="p-2 border rounded-lg bg-[#3a3086] text-white"
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
              >
                <option value="">Sort By Kelas (All)</option>
                {kelasList.map((kelasItem, index) => (
                  <option key={index} value={kelasItem}>
                    {kelasItem}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => router.push("/admin/data/siswa/post")}
              className="p-2 border rounded-lg bg-[#3a3086] text-white"
            >
              Add Siswa
            </button>
          </div>
          <div className="overflow-x-auto max-h-[410px] overflow-y-auto border-t border-gray-300 flex-grow">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3 border-b text-center text-lg">No</th>
                  <th className="px-6 py-3 border-b text-center text-lg">
                    Nama
                  </th>
                  <th className="px-6 py-3 border-b text-center text-lg">
                    NIS
                  </th>
                  <th className="px-6 py-3 border-b text-center text-lg">
                    Jurusan
                  </th>
                  <th className="px-6 py-3 border-b text-center text-lg">
                    Kelas
                  </th>
                  <th className="px-6 py-3 border-b text-center text-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((siswa, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {siswa.nama}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {siswa.nis}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {siswa.jurusan}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {siswa.kelas}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg space-x-6">
                      <button
                        onClick={() => handleUpdate(siswa.id)}
                        className="p-2 bg-blue-500 text-white rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(siswa.id, siswa.nama)}
                        className="p-2 bg-red-500 text-white rounded-lg"
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
        {totalPages > 1 && (
          <div className="flex space-x-2 items-end justify-end m-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`p-2 px-4 border rounded-lg ${
                  currentPage === index + 1
                    ? "bg-[#3a3086] text-white"
                    : "bg-white text-[#3a3086]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
