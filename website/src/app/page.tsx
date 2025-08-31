"use client";

import Image from "next/image";
import { AgiloHubLogo } from "@/components/Logos/AgiloHubLogo";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="">
      <div className="relative bg-dark-blue h-[400px] sm:h-[500px] md:h-[600px] xl:h-[700px] -z-20 overflow-hidden">
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

        <section className="container mx-auto px-6 md:px-28 xl:px-32 py-12 h-[400px] sm:h-[500px] md:h-[600px] xl:h-[700px] flex flex-col md:flex-row items-center md:justify-between">
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
      <main className="bg-dark-blue">
        <p className="text-white p-10">Additional content here</p>
      </main>
    </div>
  );
}
