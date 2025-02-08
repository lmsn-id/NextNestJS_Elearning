import HomeDashboard from "@/components/home/Dashboard";
import InformasiDashboard from "@/components/home/Informasi";
import LayananDashboard from "@/components/home/Layanan";
import GallaryDashboard from "@/components/home/Gallary";

export default function Home() {
  return (
    <>
      <div>
        <HomeDashboard />
        <LayananDashboard />
        <InformasiDashboard />

        <GallaryDashboard />
      </div>
    </>
  );
}
