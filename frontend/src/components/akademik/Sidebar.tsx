"use client";

import { useState, useEffect } from "react";
import Icon from "../Icon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/hook/useComponents";

export default function SidebarAkademik() {
  const pathname = usePathname();
  const baseurl = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : "/";
  };

  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, closeSidebar } = useSidebarStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path: string) =>
    path === pathname || (path === `${baseurl()}/` && pathname === baseurl());

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <aside
        className={`bg-gray-100 min-h-screen ${isOpen ? "w-72" : "w-16"} ${
          isMobile ? "fixed z-50" : "relative"
        } ${
          isOpen && isMobile
            ? "translate-x-0 w-52"
            : isMobile
            ? "-translate-x-full"
            : ""
        } transition-all duration-500 shadow-xl text-gray-600 p-2 md:p-4`}
      >
        <div className="flex flex-col justify-between h-full">
          <section>
            <div
              style={{ transitionDelay: `300ms` }}
              className={`whitespace-pre duration-500 gap-5 ${
                !isOpen && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              <Link href="/" className="flex items-center flex-col gap-2">
                <Image
                  width={100}
                  height={100}
                  src="/image/LOGO-NEW-SMKN5.png"
                  className="w-10"
                  alt="Logo SMKN 5"
                />
                <h2>SMKN 5 Kab Tangerang</h2>
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {(
                [
                  { name: "Dashboard", icon: "MdOutlineDashboard", link: "/" },
                  {
                    name: "Data Siswa",
                    icon: "PiStudentFill",
                    link: "/data-siswa",
                  },
                  { name: "Materi", icon: "TbBook", link: "/materi" },
                  {
                    name: "Jadwal Mengajar",
                    icon: "FiCalendar",
                    link: "/jadwal",
                  },
                  {
                    name: "Analytics",
                    icon: "TbReportAnalytics",
                    link: "/analytics",
                  },
                  {
                    name: "File Manager",
                    icon: "FiFolder",
                    link: "/file-manager",
                  },
                ] as const
              ).map((menu, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={`${baseurl()}${menu.link}`}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                      isActive(`${baseurl()}${menu.link}`)
                        ? "bg-gray-300 text-gray-900"
                        : "hover:bg-gray-300"
                    } cursor-pointer`}
                  >
                    <Icon name={menu.icon} size={20} />
                    {isOpen && <span>{menu.name}</span>}
                  </Link>

                  {!isOpen && (
                    <h2
                      className="absolute left-48 top-0 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden 
                    group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit"
                    >
                      {menu.name}
                    </h2>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
