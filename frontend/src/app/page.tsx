"use client";

import { useEffect, useState } from "react";
import HomeDashboard from "@/components/home/Dashboard";
import LayananDashboard from "@/components/home/Layanan";
import InformasiDashboard from "@/components/home/Informasi";
import GallaryDashboard from "@/components/home/Gallary";
import Loading from "@/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <Loading bgColor="bg-gray-100" isAbsolute />
  ) : (
    <div>
      <HomeDashboard />
      <LayananDashboard />
      <InformasiDashboard />
      <GallaryDashboard />
    </div>
  );
}
