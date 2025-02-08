"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NavbarUseEffect } from "@/hook/useEffect";
import { hiddenNavbar } from "@/hook/useComponents";
import LogoutButton from "@/components/LogoutBotton";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

interface SessionProp {
  session: Session | null;
}

export default function Navbar({ session }: SessionProp) {
  const { toggleMenu, isMobile, isOpen, setIsOpen } = NavbarUseEffect();

  const Activate = usePathname();

  if (hiddenNavbar()) {
    return null;
  }

  const ComponentPlus = () => {
    if (session?.user?.is_superuser && session?.user?.role === "superadmin") {
      return (
        <li>
          <Link
            href="/admin"
            className="block py-2 px-3 text-white rounded md:hover:text-black"
          >
            Admin
          </Link>
        </li>
      );
    }

    if (session?.user?.role === "siswa") {
      return (
        <li>
          <Link
            href="/e-learning"
            className="block py-2 px-3 text-white rounded md:hover:text-black"
          >
            E-Learning
          </Link>
        </li>
      );
    }

    if (session?.user?.role === "GURU") {
      return (
        <li>
          <Link
            href="/akademik"
            className="block py-2 px-3 text-white rounded md:hover:text-black"
          >
            Akademik
          </Link>
        </li>
      );
    }

    return null;
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, filter: "brightness(0%)" }}
        animate={{ opacity: 1, filter: "brightness(100%)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={`bg-[#3a3086] ${
          isOpen ? "fixed" : "sticky"
        } top-0 z-50 w-full border-gray-200`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/image/icon.svg"
              height={100}
              width={100}
              alt="Logo"
              className="w-7"
            />
            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap text-white">
              SMKN 5 Kab Tangerang
            </span>
          </Link>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                className={`transition-transform duration-300 origin-center ${
                  isOpen ? "rotate-[135deg] -translate-y-[6px]" : ""
                }`}
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                className={`transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                className={`transition-transform duration-300 origin-center ${
                  isOpen ? "-rotate-[135deg] translate-y-[3px]" : ""
                }`}
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
          {isMobile ? (
            <motion.div
              initial={{ transform: "translateY(-100%)", opacity: 0 }}
              animate={
                isOpen
                  ? { transform: "translateY(45%)", opacity: 1 }
                  : { transform: "translateY(-100%)", opacity: 0 }
              }
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className={`fixed top-0 left-0 w-full bg-[#3a3086] z-40 p-4 text-center border-t border-white `}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col items-center">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white rounded md:hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white rounded md:hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                {session ? (
                  <>
                    <ComponentPlus />
                    <li>
                      <div className="flex w-full justify-center text-white rounded hover:text-black">
                        <LogoutButton />
                      </div>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 px-3 text-white rounded md:hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </motion.div>
          ) : (
            <div
              className={`w-full md:block md:w-auto ${
                isOpen
                  ? "block fixed top-16 inset-x-0 bg-[#3a3086] z-40 p-4 text-center"
                  : "hidden"
              } md:relative md:top-auto md:bg-transparent md:z-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-row items-center md:space-x-3">
                <li>
                  <Link
                    href="/"
                    className={`block py-2 px-3 rounded  ${
                      Activate === "/"
                        ? " text-black hover:text-white"
                        : "text-white hover:text-black"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white rounded md:hover:text-black"
                  >
                    Profile
                  </Link>
                </li>
                <ComponentPlus />
                <li>
                  {session ? (
                    <div className="flex w-full justify-center text-white rounded hover:text-black">
                      <LogoutButton />
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block py-2 px-3 text-white rounded md:hover:text-black"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </motion.nav>
    </>
  );
}
