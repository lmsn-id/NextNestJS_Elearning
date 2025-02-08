import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SessionData } from "@lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMKN 5 Kab Tangerang || Home",
  description: "SMKN 5 Kabupaten Tangerang",
  icons: {
    icon: "/image/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Session = await SessionData();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={Session}>
          <ToastContainer />
          <Navbar session={Session} />
          <main className="w-full h-full">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
