import type { Metadata } from "next";
import { Hero } from "@/components/Hero/hero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to AgiloHub – the gamified agile project management tool to organise projects, tasks, and teams.",
  openGraph: {
    title: "Home | AgiloHub",
    description:
      "Gamified agile project management with points, collaboration, and productivity tools.",
    url: "https://agilohub.com",
    images: ["/AgiloHub-mobile-mockup.png"],
  },
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />
      </main>
    </>
  );
}
