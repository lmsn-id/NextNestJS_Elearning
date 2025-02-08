"use client";
import { IoPlayOutline } from "react-icons/io5";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Grid, Navigation } from "swiper/modules";

export default function GallaryDashboard() {
  const videos = [
    {
      title: "Condong Pada Mimpi",
      thumbnail:
        "https://alukhuwah.com/wp-content/uploads/2019/08/gambar-pemandangan-terindah-di-dunia7.jpg",
    },
    {
      title: "Vocational Video Challenge 2022",
      thumbnail:
        "https://i.ytimg.com/vi/kRYfbsf1iV0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDDcQ5mIPTzwe1ztTbG6Kb5xOGJoQ",
    },
    {
      title: "Dirgahayu SMKN 5 Kabupaten Tangerang",
      thumbnail:
        "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/21/fceb041d-78ad-4556-add2-de8ffd01cf14.jpg",
    },
    {
      title: "Wisuda Angkatan 15",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPGv6-EP-n_p1bT5TYrgew-CoW7QhjZBSQrQ&usqp=CAU",
    },
    {
      title: "Dhivara of Citius",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xr-XvNoDpyWrpKF_snm2zRPIahM1P9L6-Q&usqp=CAU",
    },
    {
      title: "Enlima Campus 2023",
      thumbnail:
        "https://filebroker-cdn.lazada.co.id/kf/S276238e684d3494cb25a79a521945167R.jpg",
    },
  ];

  return (
    <section className="container mx-auto px-5 mt-24">
      <h2 className="text-center text-3xl font-bold mb-8">Galeri Video</h2>
      <p className="text-center text-lg mb-12">
        Galeri Video Kegiatan, Lomba, dan Juga Pembelajaran
      </p>

      <Swiper
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={30}
        modules={[Grid, Navigation]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="relative group">
              <Image
                width={300}
                height={200}
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <Link
                  href="#"
                  className="bg-[#3a3086] text-white p-4 rounded-full text-2xl focus:outline-none"
                >
                  <IoPlayOutline />
                </Link>
              </div>
              <p className="mt-2 text-center font-semibold">{video.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
