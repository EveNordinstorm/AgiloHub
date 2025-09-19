import Image from "next/image";
import FullTierCards from "@/components/SubscriptionTiers/fullTierCards";

export default function StorePage() {
  return (
    <section className="relative h-[1700px] md:h-[800px] overflow-hidden">
      <h2 className="text-white font-semibold text-2xl md:text-3xl xl:text-4xl text-center mt-10">
        Subscription Tiers
      </h2>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/stars-bg-01.svg"
          alt="Background of stars in space"
          fill
          className="object-cover"
          priority
        />
      </div>
      <FullTierCards />
    </section>
  );
}
