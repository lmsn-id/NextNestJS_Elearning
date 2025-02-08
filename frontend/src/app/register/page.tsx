"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    if (!data.username || !data.email || !data.password) {
      toast.info("Username, Email dan password tidak boleh kosong");
      return;
    }

    if (!data.email.includes("@")) {
      toast.info("Email tidak valid");
      return;
    }

    console.log(data);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`;

      const res = await axios.post(url, data);

      console.log(res);

      if (res.status >= 200 && res.status < 300) {
        toast.success(res.data.message, {
          onClose: () => {
            router.push(res.data.redirect);
          },
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Register gagal");
      }
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("username")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              email
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
