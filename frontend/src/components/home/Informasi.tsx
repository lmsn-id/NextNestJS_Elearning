"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper/types";

const cards = [
  {
    date: "4 November 2024",
    category: "Akademik | Asesmen | Informasi Terbaru",
    title:
      "Menggali Potensi Diri: Asesmen Bakat dan Minat (ABM) di SMK Negeri 5 Tahun 2024",
    description:
      "Mauk, Kabupaten Tangerang – Senin, 4 November 2024. Pelaksanaan kegiatan Asesmen Bakat dan Minat (ABM)...",
    imageUrl:
      "https://cdn1-production-images-kly.akamaized.net/J_qaSn7xpC5d-kbHx-wCsOiFsuY=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4770934/original/018943800_1710311605-mountains-8451480_1280.jpg",
  },
  {
    date: "4 November 2024",
    category: "Informasi Terbaru | Prestasi",
    title:
      "Tim Delima (Debat Enlima) SMKN 5 Kabupaten Tangerang Raih Juara 3 di Ajang Lomba Debat “FEBis Week 2024”",
    description:
      "Mauk, Kabupaten Tangerang. Tim debat SMKN 5 Kabupaten Tangerang berhasil meraih Juara 3 dalam lomba...",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5a2ru4h4gAr-SjC1Dv4X-Gf6jE-waM3bky4fLRch_Z0rrFm1qzbQ6BOI&s=10",
  },
  {
    date: "4 November 2024",
    category: "Informasi Terbaru | N5 Event",
    title:
      "Sorotan Media: Enlima Fest 2024 SMKN 5 Kabupaten Tangerang, Perayaan Inspiratif untuk Pendidikan dan Karier!",
    description:
      "Mauk, Kabupaten Tangerang – SMK Negeri 5 Kabupaten Tangerang sukses menggelar Enlima Fest 2024, sebuah...",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-bVSWVKK1ENuGmO9PaKA_2ODtfBOZyoxqVA&usqp=CAU",
  },
];

export default function InformasiDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <section className="container mx-auto px-5">
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-center">
            <h1 className="text-xl font-bold">Postingan Terbaru</h1>
          </div>
          <div className="w-full flex justify-center relative">
            <div className="flex gap-1 items-center">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-600 h-1 w-8"
                      : "bg-gray-400 h-2 w-2"
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center">
            <p className="font-medium text-center">
              Anda bisa membaca Informasi terbaru dari kami disini
            </p>
          </div>
        </div>
        <div className="mt-14">
          <div className="block lg:hidden">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return `
                    <span class="${className} ${
                    index === activeIndex
                      ? "bg-blue-600 opacity-100 w-10 h-2 rounded-md transition-all duration-300"
                      : "bg-blue-600 opacity-50 w-2 h-2 rounded-full transition-all duration-300"
                  }"></span>`;
                },
              }}
              onSlideChange={handleSlideChange}
              modules={[Autoplay, Navigation, Pagination]}
              className="mySwiper"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#3a3086] shadow-lg rounded-xl overflow-hidden w-full max-w-[350px] mx-auto">
                    <div className="m-5">
                      <Image
                        width={300}
                        height={200}
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-md font-semibold text-gray-300">
                        {card.date}
                      </div>
                      <div className="text-md font-semibold text-blue-600">
                        {card.category}
                      </div>
                      <h3 className="font-bold text-lg text-white mt-2">
                        {card.title}
                      </h3>
                      <p className="text-white mt-2">{card.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-[#3a3086] shadow-lg rounded-xl overflow-hidden"
              >
                <div className="m-5">
                  <Image
                    width={300}
                    height={200}
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="text-md font-semibold text-gray-300">
                    {card.date}
                  </div>
                  <div className="text-md font-semibold text-blue-600">
                    {card.category}
                  </div>
                  <h3 className="font-bold text-lg text-white mt-2">
                    {card.title}
                  </h3>
                  <p className="text-white mt-2">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
