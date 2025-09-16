import type { Metadata } from "next";
import { Hero } from "@/components/Hero/hero";
import { TestimonialCard } from "@/components/Testimonials/testimonialCard";
import { testimonials } from "@/data/testimonials";

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
        <section className="py-16 bg-dark-blue px-8 md:px-14 lg:px-20">
          <h2 className="text-lg md:text-2xl text-white font-bold text-center mb-12">
            {`Don't just listen to us, here's what our clients say:`}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
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
      </main>
    </>
  );
}
