"use client";
import { useState, useEffect, useRef } from "react";
import Icon from "../Icon";
import Link from "next/link";
import LogoutButton from "../LogoutBotton";
import { useSidebarStore } from "@/hook/useComponents";

export interface DataAkademik {
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

interface NavbarProps {
  dataAkademik: DataAkademik | null;
}

export default function NavbarAkademik({ dataAkademik }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <>
      <nav className="bg-gray-200   px-4 py-3 border-b-2 ">
        <ul className="flex items-center justify-between md:flex-row-reverse">
          <li className="text-sm md:mx-20 flex justify-center items-center gap-5 relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="bg-green-600 rounded-full p-2">
                <Icon
                  name="FaUserTie"
                  className="text-white font-semibold"
                  size={25}
                />
              </div>
              <div>
                <h4 className="font-semibold">{dataAkademik?.nama}</h4>
                <div className="flex gap-1">
                  <p className="text-xs">{dataAkademik?.posisi}</p>
                </div>
              </div>

              <Icon
                name="IoIosArrowForward"
                className={`${
                  dropdownOpen
                    ? "rotate-90 duration-200"
                    : "rotate-0 duration-200"
                }`}
                size={18}
              />
            </div>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-14 left-1/2 transform -translate-x-12  md:-translate-x-1/2 mt-2 w-48 bg-white rounded shadow-md z-50"
              >
                <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                <ul className="text-sm text-gray-800">
                  <li className="border-b">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <div className="flex px-4 py-2 hover:bg-gray-100 font-semibold">
                      <LogoutButton className="w-full text-start" />
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="text-lg font-semibold">
            <Icon
              name="HiMenuAlt3"
              className="cursor-pointer"
              size={25}
              onClick={toggleSidebar}
            />
          </li>
        </ul>
      </nav>
    </>
  );
}
