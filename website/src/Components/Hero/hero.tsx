"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AgiloHubLogo } from "@/components/Logos/AgiloHubLogo";
import { motion } from "motion/react";

export function Hero() {
  const router = useRouter();

  return (
    <div>
      <div className="relative h-[500px] sm:h-[600px] md:h-[600px] xl:h-[700px] overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        >
          <Image
            src="/stars-bg-01.svg"
            alt="Background of stars in space"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <section className="container mx-auto px-6 md:px-28 xl:px-32 py-12 flex flex-col md:flex-row items-center md:justify-between h-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start space-y-5 text-center md:text-left"
          >
            <AgiloHubLogo className="text-white w-48 md:w-72 lg:w-96" />
            <h1 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
              The No.1 hub for Agile teams
            </h1>
            <p className="text-white font-bold lg:text-lg">
              Get the free gamified app
            </p>
            <button
              onClick={() => router.push("/store")}
              className="bg-yellow hover:bg-primary-blue hover:text-white transition-colors duration-150 ease-in hover:cursor-pointer font-bold text-base lg:text-lg rounded px-4 py-1.5"
            >
              Try Now
            </button>
          </motion.div>

          <motion.div
            className="hidden md:block h-96 w-0.5 bg-white mx-8"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          ></motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mt-8 md:mt-0"
          >
            <Image
              src="/AgiloHub-mobile-mockup.png"
              alt="Mobile mock up of the AgiloHub app"
              width={450}
              height={450}
              className="w-40 sm:w-60 md:w-72 lg:w-[350px] h-auto"
              priority
            />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
