"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from "@/components/Icon";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function LayananDashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="container mx-auto px-5 translate-y-[-8.3rem] z-50">
      {isMobile ? (
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {[Card, Card2, Card3, Card4].map((Component, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center h-full"
            >
              <Component />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          <Card />
          <Card2 />
          <Card3 />
          <Card4 />
        </div>
      )}
    </section>
  );
}

const Card = () => (
  <div className="group flex flex-col items-center p-4 md:p-6 bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md w-64 h-48 md:w-72 md:h-56 mx-auto">
    <div className="flex flex-col items-center mb-4">
      <div className="w-full flex justify-center mb-3">
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-white group-hover:border-[#3a3086]">
          <Icon
            name="FaBookBookmark"
            className="text-2xl md:text-3xl text-white group-hover:text-[#3a3086] shadow-xl"
          />
        </div>
      </div>
      <div className="text-center h-full">
        <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-[#3a3086] mb-2">
          E-RAPORT
        </h3>
        <div className="bg-white text-black font-semibold group-hover:text-white group-hover:bg-[#3a3086] rounded px-2 py-1 inline-block">
          <Link href="#" className="text-sm md:text-lg">
            Kunjungi
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Card2 = () => (
  <div className="group flex flex-col items-center p-4 md:p-6 bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md w-64 h-48 md:w-72 md:h-56 mx-auto">
    <div className="flex flex-col items-center mb-4">
      <div className="w-full flex justify-center mb-3">
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-white group-hover:border-[#3a3086]">
          <Icon
            name="FaBookBookmark"
            className="text-2xl md:text-3xl text-white group-hover:text-[#3a3086] shadow-xl"
          />
        </div>
      </div>
      <div className="text-center h-full">
        <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-[#3a3086] mb-2">
          e-KINERJA
        </h3>
        <div className="bg-white text-black font-semibold group-hover:text-white group-hover:bg-[#3a3086] rounded px-2 py-1 inline-block">
          <Link href="#" className="text-sm md:text-lg">
            Kunjungi
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Card3 = () => (
  <div className="group flex flex-col items-center p-4 md:p-6 bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md w-64 h-48 md:w-72 md:h-56 mx-auto">
    <div className="flex flex-col items-center mb-4">
      <div className="w-full flex justify-center mb-3">
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-white group-hover:border-[#3a3086]">
          <Icon
            name="FaBookBookmark"
            className="text-2xl md:text-3xl text-white group-hover:text-[#3a3086] shadow-xl"
          />
        </div>
      </div>
      <div className="text-center h-full">
        <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-[#3a3086] mb-2">
          CEK IJAZAH
        </h3>
        <div className="bg-white text-black font-semibold group-hover:text-white group-hover:bg-[#3a3086] rounded px-2 py-1 inline-block">
          <Link href="#" className="text-sm md:text-lg">
            Kunjungi
          </Link>
        </div>
      </div>
    </div>
  </div>
);
const Card4 = () => (
  <div className="group flex flex-col items-center p-4 md:p-6 bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md w-64 h-48 md:w-72 md:h-56 mx-auto">
    <div className="flex flex-col items-center mb-4">
      <div className="w-full flex justify-center mb-3">
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-white group-hover:border-[#3a3086]">
          <Icon
            name="FaCalendarAlt"
            className="text-2xl md:text-3xl text-white group-hover:text-[#3a3086] shadow-xl"
          />
        </div>
      </div>
      <div className="text-center h-full">
        <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-[#3a3086] mb-2">
          Kalender
        </h3>
        <div className="bg-white text-black font-semibold group-hover:text-white group-hover:bg-[#3a3086] rounded px-2 py-1 inline-block">
          <Link href="#" className="text-sm md:text-lg">
            Kunjungi
          </Link>
        </div>
      </div>
    </div>
  </div>
);
