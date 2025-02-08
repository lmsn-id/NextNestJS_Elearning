"use client";
import React from "react";
import { AddDataAkademik } from "@/hook/usePost";

export default function AddAkunAkademik() {
  const {
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    fields,
    append,
    posisi,
  } = AddDataAkademik();

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
                        {...register(`Materi.${index}.value`, {
                          required: "Materi wajib diisi",
                        })}
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
                        {...register(`Materi.${index}.kelasMateri`)}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex-shrink-0"
                      onClick={() =>
                        append({
                          id: Date.now().toString(),
                          value: "",
                          kelasMateri: [],
                        })
                      }
                    >
                      Add Materi
                    </button>
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
