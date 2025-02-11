"use client";
import { useAkademik } from "@/context/AkademikContext";

export default function Akademi() {
  const { dataAkademik } = useAkademik();
  console.log(dataAkademik);

  return (
    <>
      <h1>Akademi</h1>
    </>
  );
}
