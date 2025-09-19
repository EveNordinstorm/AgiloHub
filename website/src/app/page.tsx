import type { Metadata } from "next";
import { Hero } from "@/components/Hero/hero";
import { TestimonialCard } from "@/components/Testimonials/testimonialCard";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";
import BriefTierCards from "@/components/SubscriptionTiers/briefTierCards";

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
        <section className="bg-dark-blue py-16 lg:py-26 px-8 md:px-14 lg:px-20 xl:px-26">
          <h2 className="text-lg md:text-2xl text-white font-bold text-center mb-12">
            {`Don't just listen to us, here's what our clients say:`}
          </h2>
          <div className="grid gap-5 md:gap-10 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <TestimonialCard
                key={index}
                quote={t.quote}
                name={t.name}
                title={t.title}
              />
            ))}
          </div>
        </section>

        {/* JSON-LD for testimonial SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              itemReviewed: {
                "@type": "Organization",
                name: "AgiloHub",
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
              author: testimonials.map((t) => ({
                "@type": "Person",
                name: t.name,
                jobTitle: t.title,
                reviewBody: t.quote,
              })),
            }),
          }}
        />

        <div className="bg-dark-blue">
          <section className="bg-primary-blue py-16 lg:py-26 px-8 md:px-14 lg:px-20 xl:px-26 [clip-path:polygon(0%_0%,100%_10%,100%_100%,0%_100%)]">
            <h2 className="text-lg md:text-2xl text-white font-bold text-center mt-8 mb-5 md:mb-12">
              {`Gamify your tasks so your agile projects become motivational for your whole team`}
            </h2>
            <div className="md:flex justify-between items-center">
              <ul className="list-disc text-white font-semibold text-lg md:text-xl lg:text-2xl mx-5 md:mx-10">
                <li>Team projects</li>
                <li>Member connections</li>
                <li>Includes all Agile Methodologies</li>
                <li>Work and personal projects</li>
                <li>Mobile and desktop access</li>
                <li>Rewarding productivity</li>
              </ul>
              <div className="bg-gray-100 w-full h-60 mt-10">
                <p className="p-5 font-bold">Placeholder for images</p>
              </div>
            </div>
          </section>
        </div>

        <section className="relative h-[1350px] md:h-[550px] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/stars-bg-01.svg"
              alt="Background of stars in space"
              fill
              className="object-cover"
              priority
            />
          </div>
          <BriefTierCards />
        </section>
      </main>
    </>
  );
}
