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
  title: {
    default: "Agile Project Management App",
    template: "Home | AgiloHub",
  },
  description:
    "Organise projects, tasks, and teams with our agile gamified project management tool. Built with React Native & Next.js.",
  openGraph: {
    type: "website",
    url: "https://evenordinstorm.com",
    title: "Agile Project Management App",
    description:
      "Manage projects, tasks, timelines in a gamified experience, including team collaboration with chat.",
    images: [
      {
        url: "/AgiloHub-mobile-mockup.png",
        width: 450,
        height: 450,
        alt: "AgiloHub mobile app mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agile Project Management App",
    description:
      "Organise projects, tasks, and teams with our agile gamified project management tool.",
    images: ["/AgiloHub-mobile-mockup.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
