"use client";

import { useRouter } from "next/navigation";
import { AgiloHubLogo } from "@/components/Logos/AgiloHubLogo";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const router = useRouter();

  return (
    <div className="bg-dark-blue w-full text-white p-10">
      <section className="md:flex justify-between items-end md:h-22">
        <div>
          <p className="text-lg mb-2">Got questions?</p>
          <h3
            onClick={() => router.push("/about")}
            className="hover:cursor-pointer font-bold text-5xl"
          >
            FAQs
          </h3>
        </div>
        <Separator orientation="vertical" />
        <div className="sm:flex justify-between md:gap-32 items-baseline">
          <h4 className="font-bold text-3xl mt-8 md:mt-0">Contact us</h4>
          <p className="font-medium text-lg">info@agilohub.com</p>
        </div>
      </section>
      <Separator orientation="horizontal" className="my-10" />
      <section className="md:flex justify-between">
        <div className="flex gap-5 md:gap-10">
          <div>
            <div className="font-semibold text-xl mb-2">Mobile</div>
            <ul>
              <li>Membership</li>
              <li>Projects</li>
              <li>Tasks</li>
              <li>Gamified Rewards</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-xl mb-2">Desktop</div>
            <ul>
              <li>Projects</li>
              <li>Tasks</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
        <div className="flex-col justify-items-center space-y-3 mt-8 md:mt-0">
          <AgiloHubLogo className="text-white w-38 md:w-48 xl:w-62" />
          <p className="font-semibold text-xs lg:text-sm">© AgiloHub 2025</p>
        </div>
      </section>
    </div>
  );
}
