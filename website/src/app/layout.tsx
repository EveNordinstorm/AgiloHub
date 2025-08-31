import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar/navBar";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "AgiloHub",
  description: "The Number 1 hub for agile teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserratAlternates.variable} antialiased`}>
      <body className="font-sans">
        <NavBar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
