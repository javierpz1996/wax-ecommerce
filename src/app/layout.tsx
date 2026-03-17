import type { Metadata } from "next";
import { Geist, Geist_Mono,Bebas_Neue,Roboto } from "next/font/google";
import "./globals.css";
import { Pixelify_Sans } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // elegí los pesos que necesites
  variable: "--font-pixelify", // opcional si usás Tailwind
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
            ${pixelify.variable} 
            antialiased
          `}
      >
        <div className="flex min-h-screen min-h-dvh w-full justify-center bg-[var(--pac-screen)] text-white">
          <div className="flex min-h-screen min-h-dvh w-full max-w-md flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)]">
            <main className="w-full flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
