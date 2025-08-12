import Image from "next/image";
import { AgiloHubLogo } from "@/components/AgiloHubLogo";

export default function Home() {
  return (
    <div className="bg-dark-blue relative">
      <main>
        <Image
          src="/stars-bg-01.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          className="w-full"
          priority
        />
        <AgiloHubLogo className="text-white absolute top-1" />
      </main>
      <footer></footer>
    </div>
  );
}
