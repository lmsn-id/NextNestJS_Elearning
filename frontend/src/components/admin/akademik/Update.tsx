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
  materi?: {
    value: string;
    kelasMateri: string | string[];
    jadwal: string | string[];
  }[];
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
              kelasMateri:
                m.kelasMateri && typeof m.kelasMateri === "string"
                  ? m.kelasMateri.split(", ")
                  : Array.isArray(m.kelasMateri)
                  ? m.kelasMateri
                  : [],
              jadwal:
                m.jadwal && typeof m.jadwal === "string"
                  ? m.jadwal.split(", ")
                  : Array.isArray(m.jadwal)
                  ? m.jadwal
                  : [],
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
            Update Data Akademik
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="Nip"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              NIP
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="Nip"
              type="text"
              placeholder="Masukan NIP"
              {...register("nip", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Nuptk"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              NUPTK
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="Nuptk"
              type="text"
              placeholder="Masukan NUPTK"
              {...register("nuptk")}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Nama"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nama
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="Nama"
              type="text"
              placeholder="Masukan Nama"
              {...register("nama", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Posisi"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Posisi
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="Posisi"
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Materi {index + 1}
                  </label>
                  <div className="flex justify-between items-center">
                    <input
                      className="shadow border w-1/2 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      type="text"
                      {...register(`materi.${index}.value`, {
                        required: "Materi wajib diisi",
                      })}
                    />
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => remove(index)}
                      >
                        Hapus
                      </button>
                      <button
                        type="button"
                        className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => {
                          const newKelasMateri = [...item.kelasMateri, ""];
                          const newJadwal = [...item.jadwal, ""];
                          const updatedMateri = {
                            ...item,
                            kelasMateri: newKelasMateri,
                            jadwal: newJadwal,
                          };
                          remove(index);
                          append(updatedMateri);
                        }}
                      >
                        Add Kelas
                      </button>

                      <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() =>
                          append({
                            value: "",
                            kelasMateri: [],
                            jadwal: [],
                          })
                        }
                      >
                        Add Materi
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      {Array.isArray(item.kelasMateri) &&
                        item.kelasMateri.map((kelas, kelasIndex) => (
                          <div key={kelasIndex} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Kelas Materi {kelasIndex + 1}
                            </label>
                            <input
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="Masukan Kelas Materi"
                              {...register(
                                `materi.${index}.kelasMateri.${kelasIndex}`
                              )}
                            />
                          </div>
                        ))}
                    </div>
                    <div>
                      {Array.isArray(item.jadwal) &&
                        item.jadwal.map((jadwal, jadwalIndex) => (
                          <div key={jadwalIndex} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Jadwal {jadwalIndex + 1}
                            </label>
                            <input
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="Masukan Jadwal"
                              {...register(
                                `materi.${index}.jadwal.${jadwalIndex}`
                              )}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="w-full flex justify-end space-x-8">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 rounded-lg shadow-md px-4 py-2 text-white font-semibold"
              onClick={() => reset()}
            >
              Reset
            </button>
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
