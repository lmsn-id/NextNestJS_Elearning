"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import Image from "next/image";

interface FormValues {
  username: string;
  password: string;
}

interface LoginPageProps {
  session: Session | null;
}

export default function LoginPage({ session }: LoginPageProps) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const { message, redirect } = session.user;
      toast.success(message, {
        onClose: () => {
          router.push(redirect);
        },
      });
    }
  }, [session, router]);

  const onSubmit = async (data: FormValues) => {
    if (!data.username || !data.password) {
      toast.info("Email dan password tidak boleh kosong");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (result?.ok) {
        router.refresh();
      } else {
        toast.error(result?.error || "Login gagal");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login gagal");
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <Image
          src="/image/bg1.jpg"
          width={9999}
          height={9999}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 bg-sky-100">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              placeholder="Masukkan username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>

            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Masukkan password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
