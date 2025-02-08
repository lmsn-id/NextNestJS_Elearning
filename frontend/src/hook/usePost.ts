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
  Materi: { id: string; value: string; kelasMateri: string[] }[];
}

export const AddDataAkademik = () => {
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
      Materi: [{ id: Date.now().toString(), value: "", kelasMateri: [] }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "Materi",
  });

  const posisi = watch("Posisi");

  const onSubmit = async (data: FormValues) => {
    console.log("Data Input", data);

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
      data.Materi.some((materi) => !materi.value || !materi.kelasMateri.length)
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

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    fields,
    append,
    posisi,
  };
};
