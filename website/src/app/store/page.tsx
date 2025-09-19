import Image from "next/image";
import FullTierCards from "@/components/SubscriptionTiers/fullTierCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";

export default function StorePage() {
  return (
    <div>
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
      <section>
        <div className="bg-black text-white p-10 md:px-32 md:py-24 md:flex gap-6">
          <FontAwesomeIcon
            icon={faHeadset}
            className="text-6xl md:text-8xl mb-4"
          />
          <div className="w-full">
            <h3 className="font-bold text-2xl">Quotes or questions?</h3>
            <p className="md:text-lg mt-2 md:mt-4">
              Our dedicated customer service team’s got you.
            </p>
            <Separator orientation="horizontal" className="my-4 w-full" />
            <p className="font-semibold">Reach us on</p>
            <p className="text-xl">info@agilohub.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
