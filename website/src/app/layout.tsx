import type { Metadata } from "next";
import { Providers } from "./providers";
import AuthBootstrapper from "./authBootstrapper";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar/navBar";
import { Footer } from "@/components/Footer/footer";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AgiloHub – Agile Project Management App",
    template: "%s | AgiloHub",
  },
  description:
    "AgiloHub helps you organise projects, tasks, and teams in a gamified agile workspace. Built for collaboration and productivity.",
  keywords: [
    "Agile project management",
    "SaaS project tool",
    "team collaboration",
    "task management",
    "React Native app",
  ],
  applicationName: "AgiloHub",
  authors: [{ name: "AgiloHub Team" }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://agilohub.com",
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
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
