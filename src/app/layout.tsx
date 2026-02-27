import type { Metadata } from "next";
import { Geist, Geist_Mono,Bebas_Neue,Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footbar } from "../components/Footbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Wax",
  description: "Home con secciones y carrusel de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
          className={`
            ${geistSans.variable} 
            ${geistMono.variable} 
            ${bebas.variable} 
            ${roboto.variable} 
            antialiased
          `}
      >
        <div className="min-h-dvh bg-white text-black dark:bg-black dark:text-white">
          <Navbar />
          <main className="mx-auto w-full px-6 py-10">{children}</main>
          <Footbar />
        </div>
      </body>
    </html>
  );
}
