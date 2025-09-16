"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      animate={{
        rotate: [0, -5, 5, -3, 3, 0], // swing effect
        transition: { delay: 0.5, duration: 0.8 },
      }}
    >
      <div className="flex justify-center">
        <FontAwesomeIcon
          icon={faThumbTack}
          className="text-primary-purple text-4xl md:text-5xl absolute"
        />
      </div>

      <div className="bg-dark-purple p-6 md:p-10 text-white mt-5">
        <FontAwesomeIcon icon={faQuoteLeft} className="text-lg md:text-2xl" />
        <p className="my-4 text-base md:text-lg">{quote}</p>
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faQuoteRight}
            className="text-lg md:text-2xl"
          />
        </div>

        <h3 className="text-lg md:text-xl font-semibold mt-3">{name}</h3>
        <p className="text-sm md:text-base mt-2">{title}</p>
      </div>
    </motion.div>
  );
}
