import Image from "next/image";
import { AgiloHubLogo } from "@/components/AgiloHubLogo";

export default function Home() {
  return (
    <div className="">
      <div className="relative bg-dark-blue h-[400px] sm:h-[500px] md:h-[600px] xl:h-[700px] -z-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/stars-bg-01.svg"
            alt="Background of stars in space"
            fill
            className="object-cover"
            priority
          />
        </div>

        <section className="container mx-auto px-6 md:px-28 xl:px-32 py-12 h-[400px] sm:h-[500px] md:h-[600px] xl:h-[700px] flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex flex-col items-center md:items-start space-y-5 text-center md:text-left">
            <AgiloHubLogo className="text-white w-48 md:w-72 lg:w-96" />
            <h1 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
              The No.1 hub for Agile teams
            </h1>
          </div>

          <div className="hidden md:block h-96 w-0.5 bg-white mx-8"></div>

          <div className="mt-8 md:mt-0">
            <Image
              src="/AgiloHub-mobile-mockup.png"
              alt="Mobile mock up of the AgiloHub app"
              width={450}
              height={450}
              className="w-40 sm:w-60 md:w-72 lg:w-[350px] h-auto"
              priority
            />
          </div>
        </section>
      </div>
      <main className="bg-dark-blue">
        <p className="text-white p-10">Additional content here</p>
      </main>
    </div>
  );
}
