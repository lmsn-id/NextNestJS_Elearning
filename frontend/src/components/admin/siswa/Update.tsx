"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Siswa {
  id: string;
  nis: string;
  nisn: string | null;
  nama: string;
  jenis_kelamin: string | null;
  tanggal_lahir: string | null;
  tempat_lahir: string | null;
  agama: string | null;
  alamat: string | null;
  no_telepon: string | null;
  email: string | null;
  jurusan: string;
  kelas: string;
}

interface FormData {
  nis: string;
  nisn?: string;
  nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  tempat_lahir?: string;
  agama?: string;
  alamat?: string;
  no_telepon?: string;
  email?: string;
  jurusan: string;
  kelas: string;
}

export default function UpdateSiswaClient({
  siswaData,
}: {
  siswaData: Siswa | null;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    if (siswaData) {
      Object.entries(siswaData).forEach(([key, value]) => {
        if (key === "tanggal_lahir" && value) {
          const formattedDate = value.split(" ")[0];
          setValue("tanggal_lahir", formattedDate);
        } else {
          setValue(key as keyof FormData, value || "");
        }
      });
    }
  }, [siswaData, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.nis || !data.nama || !data.jurusan || !data.kelas) {
        toast.info(
          `Data ${!data.nis ? "NIS, " : ""}${!data.nama ? "Nama, " : ""}${
            !data.jurusan ? "Jurusan, " : ""
          }${!data.kelas ? "Kelas" : ""} wajib diisi!`
        );
        return;
      }

      const formattedDate = data.tanggal_lahir
        ? new Date(data.tanggal_lahir).toISOString().split("T")[0]
        : null;

      const formattedData = {
        Nis: data.nis,
        Nisn: data.nisn || null,
        Nama: data.nama,
        JenisKelamin: data.jenis_kelamin || null,
        TanggalLahir: formattedDate,
        TempatLahir: data.tempat_lahir || null,
        Agama: data.agama || null,
        Alamat: data.alamat || null,
        Email: data.email || null,
        NoTelepon: data.no_telepon || null,
        Jurusan: data.jurusan,
        Kelas: data.kelas,
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/siswa/${siswaData?.id}`,
        formattedData
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message, {
          onClose: () => router.push(response.data.redirect),
        });
      } else {
        toast.error("Gagal memperbarui data!");
      }
    } catch (error) {
      console.error("Error updating siswa:", error);
      toast.error("Terjadi kesalahan saat memperbarui data.");
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="w-full flex justify-center mb-4">
        <h1 className="text-gray-900 text-lg font-semibold">Update Siswa</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 overflow-y-auto max-h-full p-2"
      >
        {[
          { label: "NIS", name: "nis", type: "text", required: true },
          { label: "NISN", name: "nisn", type: "text", required: false },
          { label: "Nama", name: "nama", type: "text", required: true },
          {
            label: "Tanggal Lahir",
            name: "tanggal_lahir",
            type: "date",
            required: false,
          },
          {
            label: "Tempat Lahir",
            name: "tempat_lahir",
            type: "text",
            required: false,
          },
          { label: "Agama", name: "agama", type: "text", required: false },
          { label: "Alamat", name: "alamat", type: "text", required: false },
          {
            label: "No Telepon",
            name: "no_telepon",
            type: "text",
            required: false,
          },
          {
            label: "Email",
            name: "email",
            type: "text",
            required: false,
          },
          { label: "Kelas", name: "kelas", type: "text", required: true },
          { label: "Jurusan", name: "jurusan", type: "text", required: true },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              id={field.name}
              type={field.type}
              placeholder={`Masukkan ${field.label}`}
              {...register(field.name as keyof FormData, {
                required: field.required,
              })}
            />
            {errors[field.name as keyof FormData] && (
              <p className="text-red-500 text-xs italic">
                {field.label} wajib diisi.
              </p>
            )}
          </div>
        ))}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jenis_kelamin"
          >
            Jenis Kelamin
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            id="jenis_kelamin"
            {...register("jenis_kelamin", { required: true })}
          >
            <option value="">Silahkan pilih Jenis Kelamin</option>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.jenis_kelamin && (
            <p className="text-red-500 text-xs italic">
              Jenis Kelamin wajib diisi.
            </p>
          )}
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md px-4 py-2 text-white font-semibold"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
