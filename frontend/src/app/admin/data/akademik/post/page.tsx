"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";

interface FormValues {
  Nuptk: string;
  Nip: string;
  Nama: string;
  Posisi: string;
  Kelas: string;
  Materi: {
    id: string;
    value: string;
    kelasMateri: string[];
    jadwal: string[];
  }[];
}

export default function AddAkunAkademik() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Nuptk: "",
      Nip: "",
      Nama: "",
      Posisi: "",
      Materi: [
        { id: Date.now().toString(), value: "", kelasMateri: [], jadwal: [] },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Materi",
  });

  const posisi = watch("Posisi");

  const onSubmit = async (data: FormValues) => {
    if (!data.Nip || !data.Nama || !data.Posisi) {
      toast.info(
        `Data ${!data.Nip ? "Nip, " : ""}${!data.Nama ? "Nama, " : ""}${
          !data.Posisi ? "Posisi, " : ""
        } wajib diisi!`
      );
      return;
    }

    if (
      data.Posisi === "Guru" &&
      data.Materi.some(
        (materi) =>
          !materi.value || !materi.kelasMateri.length || !materi.jadwal.length
      )
    ) {
      toast.info("Materi dan kelas wajib diisi!");
      return;
    }

    try {
      const transformedMateri = data.Materi.map(({ ...rest }) => rest);

      const transformedData = {
        ...data,
        Materi: transformedMateri,
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/add/akademik`;
      const response = await axios.post(url, transformedData);

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
      console.error(error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md">
      <div className="p-6 max-h-full overflow-y-auto">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-gray-900 text-lg font-semibold">
            Add Akun Akademik
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("Nuptk")}
            />
          </div>
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
              {...register("Nip")}
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
              {...register("Nama")}
            />
            {errors.Nama && (
              <p className="text-red-500 text-sm">{errors.Nama.message}</p>
            )}
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
              {...register("Posisi")}
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
            {errors.Posisi && (
              <p className="text-red-500 text-sm">{errors.Posisi.message}</p>
            )}
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
                  {...register("Kelas")}
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
                      placeholder={`Masukan Materi ${index + 1}`}
                      {...register(`Materi.${index}.value`, {
                        required: "Materi wajib diisi",
                      })}
                    />
                    <div className="flex space-x-4">
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
                            id: Date.now().toString(),
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
                      {item.kelasMateri.map((kelas, kelasIndex) => (
                        <div key={kelasIndex} className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Kelas Materi {kelasIndex + 1}
                          </label>
                          <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Masukan Kelas Materi"
                            {...register(
                              `Materi.${index}.kelasMateri.${kelasIndex}`
                            )}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      {item.jadwal.map((jadwal, jadwalIndex) => (
                        <div key={jadwalIndex} className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Jadwal {jadwalIndex + 1}
                          </label>
                          <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Masukan Jadwal"
                            {...register(
                              `Materi.${index}.jadwal.${jadwalIndex}`
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
