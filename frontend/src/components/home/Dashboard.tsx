"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

export default function HomeDashboard() {
  return (
    <>
      <section className="relative w-full min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] h-[calc(50vh)]  z-0">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={2500}
          className="relative z-20 flex flex-col h-full px-5 md:px-10 lg:mx-20"
        >
          <SwiperSlide className="transition duration-[2.5s] ease-in-out transform hover:scale-105">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="absolute inset-0">
              <Image
                className="w-full h-full object-cover brightness-75 transition duration-[2.5s] ease-in-out hover:brightness-90"
                src="/image/bg1.jpg"
                fill
                alt="Background"
              />
            </div>
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-center md:justify-between h-full px-5 md:px-10 lg:mx-20">
              <div className="text-white md:w-1/2 mb-5 md:mb-0 text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-3 md:mb-5">
                  SMKN 5 Kab Tangerang
                </h4>

                <h1 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-5 leading-tight drop-shadow-lg">
                  Tiada Hari Tanpa Prestasi
                </h1>

                <p className="text-md md:text-xl font-medium text-gray-200 leading-relaxed mb-4 md:mb-6 drop-shadow">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  consequuntur eos non ullam possimus. Commodi enim ducimus
                  minima est voluptates? Fuga quo dolorum, quia ullam explicabo
                  provident accusamus eius dolorem.
                </p>
              </div>
              <div className="h-auto flex justify-center">
                <Image
                  className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] object-cover transition duration-[2.5s] ease-in-out"
                  src="/image/favicon.png"
                  width={200}
                  height={200}
                  alt="Example"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="transition duration-[2.5s] ease-in-out transform hover:scale-105">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="absolute inset-0">
              <Image
                className="w-full h-full object-cover brightness-75 transition duration-[2.5s] ease-in-out hover:brightness-90"
                src="/image/bg1.jpeg"
                fill
                alt="Background"
              />
            </div>
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-center md:justify-between h-full px-5 md:px-10 lg:mx-20">
              <div className="text-white md:w-1/2 mb-5 md:mb-0 text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-3 md:mb-5">
                  Universitas Lazer Multifunction - Slide 2
                </h4>

                <h1 className="text-3xl md:text-6xl font-extrabold mb-3 md:mb-5 leading-tight drop-shadow-lg">
                  S1 - Sistem Informasi
                </h1>

                <p className="text-md md:text-xl font-medium text-gray-200 leading-relaxed mb-4 md:mb-6 drop-shadow">
                  school Of Technopreneur Nusantara
                </p>
              </div>
              <div className="h-auto flex justify-center">
                <Image
                  className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] object-cover  transition duration-[2.5s] ease-in-out"
                  src="/image/favicon.png"
                  width={200}
                  height={200}
                  alt="Example"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
