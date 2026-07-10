import type { Metadata } from "next";
import { Archivo, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "A&G Design: Websites for HVAC Companies That Book More Jobs",
  description:
    "A&G Design builds high-converting websites exclusively for heating & air companies, engineered to rank locally, load instantly, and turn searches into service calls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
