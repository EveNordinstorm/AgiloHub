import type { Metadata } from "next";
import { Providers } from "./providers";
import AuthBootstrapper from "./authBootstrapper";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar/navBar";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
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
        <Providers>
          <AuthBootstrapper />
          <NavBar />
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
