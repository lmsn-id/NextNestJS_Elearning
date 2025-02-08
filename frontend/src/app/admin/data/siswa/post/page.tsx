"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  Nis: string;
  Nisn: string;
  Nama: string;
  JenisKelamin: string;
  TanggalLahir: string;
  TempatLahir: string;
  Agama: string;
  Alamat: string;
  NoTelepon: string;
  Jurusan: string;
  Kelas: string;
}

export default function AddDataSiswaSA() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.Nis || !data.Nama || !data.Jurusan || !data.Kelas) {
        toast.info(
          `Data ${!data.Nis ? "NIS, " : ""}${!data.Nama ? "Nama, " : ""}${
            !data.Jurusan ? "Jurusan, " : ""
          }${!data.Kelas ? "Kelas" : ""} wajib diisi!`
        );
        return;
      }

      console.log(data);

      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/add/siswa/`;
      const response = await axios.post(url, data);

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
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="w-full flex justify-center mb-4">
        <h1 className="text-gray-900 text-lg font-semibold">Post Siswa</h1>
      </div>
      <div className="flex-1 overflow-y-auto max-h-full p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {[
            { label: "NIS", name: "Nis", type: "text" },
            { label: "NISN", name: "Nisn", type: "text" },
            { label: "Nama", name: "Nama", type: "text" },
            { label: "Tanggal Lahir", name: "TanggalLahir", type: "date" },
            { label: "Tempat Lahir", name: "TempatLahir", type: "text" },
            { label: "Agama", name: "Agama", type: "text" },
            { label: "Alamat", name: "Alamat", type: "text" },
            { label: "No Telepon", name: "NoTelepon", type: "text" },
            { label: "Email", name: "Email", type: "text" },
            { label: "Kelas", name: "Kelas", type: "text" },
            { label: "Jurusan", name: "Jurusan", type: "text" },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field.name}
                type={field.type}
                placeholder={`Masukkan ${field.label}`}
                {...register(field.name as keyof FormData)}
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
              htmlFor="JenisKelamin"
            >
              Jenis Kelamin
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="JenisKelamin"
              {...register("JenisKelamin")}
            >
              <option value="">Silahkan pilih Jenis Kelamin</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.JenisKelamin && (
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
