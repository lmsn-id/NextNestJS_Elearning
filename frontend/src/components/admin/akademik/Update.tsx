"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

interface Akademik {
  id: string;
  nip: string;
  nuptk: string | null;
  nama: string;
  kelas?: string;
  materi?: { value: string; kelasMateri: string[] }[];
  posisi: string;
}

export default function UpdateAkademikClient({
  akademikData,
}: {
  akademikData: Akademik;
}) {
  const { register, handleSubmit, control, reset, watch } = useForm<Akademik>({
    defaultValues: {
      id: "",
      nip: "",
      nuptk: null,
      nama: "",
      kelas: "",
      materi: [],
      posisi: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materi",
  });

  const router = useRouter();
  const posisi = watch("posisi");

  useEffect(() => {
    if (akademikData) {
      reset({
        id: akademikData.id,
        nip: akademikData.nip || "",
        nuptk: akademikData.nuptk || null,
        nama: akademikData.nama || "",
        kelas: akademikData.kelas || "",
        materi: akademikData.materi
          ? akademikData.materi.map((m) => ({
              value: m.value,
              kelasMateri: m.kelasMateri,
            }))
          : [],
        posisi: akademikData.posisi || "",
      });
    }
  }, [akademikData, reset]);

  const onSubmit = async (data: Akademik) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/update/${akademikData.id}`;
      const response = await axios.put(url, data);

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
      console.error("Failed to update data", error);
      toast.error("Gagal memperbarui data akademik");
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md">
      <div className="p-6 max-h-full overflow-y-auto">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-gray-900 text-lg font-semibold">
            Update Data Sekolah
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Nip"
            >
              NIP
            </label>
            <input
              type="text"
              {...register("nip", { required: true })}
              placeholder="Masukkan Nip "
              id="Nip"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Nuptk"
            >
              NUPTK
            </label>
            <input
              type="text"
              {...register("nuptk")}
              placeholder="Masukkan NUPTK "
              id="Nuptk"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Nama"
            >
              Nama
            </label>
            <input
              type="text"
              {...register("nama", { required: true })}
              placeholder="Masukkan Nama "
              id="Nama"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Posisi"
            >
              Posisi
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              {...register("posisi")}
            >
              <option value="" disabled>
                Pilih Posisi
              </option>
              <option value="Guru">Guru</option>
              <option value="Staff">Staff</option>
              <option value="Tata Usaha">Tata Usaha</option>
              <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
              <option value="Kepala Sekolah">Kepala Sekolah</option>
            </select>
          </div>

          {posisi === "Guru" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="Kelas"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Kelas
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="Kelas"
                  type="text"
                  placeholder="Masukan Kelas"
                  {...register("kelas")}
                />
              </div>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-4">
                  <div className="flex items-end space-x-4 w-full">
                    <div className="w-full">
                      <label
                        htmlFor={`Materi-${index}`}
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Materi {index + 1}
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        id={`Materi-${index}`}
                        type="text"
                        placeholder={`Masukan Materi ${index + 1}`}
                        {...register(`materi.${index}.value`)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor={`Materi-${index}-kelasMateri`}
                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                      >
                        Kelas Materi
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        id={`Materi-${index}-kelasMateri`}
                        type="text"
                        placeholder="Masukkan kelas terkait (pisahkan dengan koma)"
                        {...register(`materi.${index}.kelasMateri`)}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => remove(index)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => append({ value: "", kelasMateri: [] })}
              >
                Tambah Materi
              </button>
            </>
          )}

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
