"use client";

import { createContext, useContext } from "react";

interface DataAkademik {
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

interface AkademikContextProps {
  dataAkademik: DataAkademik | null;
}

const AkademikContext = createContext<AkademikContextProps | undefined>(
  undefined
);

export const AkademikProvider = ({
  dataAkademik,
  children,
}: {
  dataAkademik: DataAkademik | null;
  children: React.ReactNode;
}) => {
  return (
    <AkademikContext.Provider value={{ dataAkademik }}>
      {children}
    </AkademikContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useAkademik = () => {
  const context = useContext(AkademikContext);
  if (!context) {
    throw new Error("useAkademik harus digunakan dalam AkademikProvider");
  }
  return context;
};
