import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // --- Subscription tiers ---
  await prisma.subscriptionTier.upsert({
    where: { tier: "Free" },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111111111",
      tier: "Free",
      strapline: "All the essentials",
      features: ["5 Projects", "Team connection", "Task management"],
      description:
        "The fundamental starter pack to gamifying your projects, organising tasks and communicating with your team.",
      buttonText: "Always Free",
    },
  });
  await prisma.subscriptionTier.upsert({
    where: { tier: "Pro" },
    update: {},
    create: {
      id: "22222222-2222-2222-2222-222222222222",
      tier: "Pro",
      strapline: "Exclusive Features",
      features: ["25 Projects", "Source code", "Custom branding"],
      description:
        "Ready to step it up with more projects and get your code base integrated? This is the tier for you and your team.",
      buttonText: "Try Free",
    },
  });
  await prisma.subscriptionTier.upsert({
    where: { tier: "Enterprise" },
    update: {},
    create: {
      id: "33333333-3333-3333-3333-333333333333",
      tier: "Enterprise",
      strapline: "Unlimited Access",
      features: ["Unlimited Projects", "Teams integration", "API access"],
      description:
        "Endless projects and tasks. Integrate your Teams system for seamless workflows and API access for the ultimate gamified project management tool.",
      buttonText: "Sign Up",
    },
  });

  // --- Methodologies ---
  const methodologies = [
    {
      id: "44444444-4444-4444-4444-444444444444",
      name: "Scrum",
      definition: "An iterative agile methodology with sprints and ceremonies.",
    },
    {
      id: "55555555-5555-5555-5555-555555555555",
      name: "Kanban",
      definition: "A visual agile method focused on flow and limiting WIP.",
    },
    {
      id: "66666666-6666-6666-6666-666666666666",
      name: "Lean",
      definition: "Eliminating waste and optimising efficiency.",
    },
    {
      id: "77777777-7777-7777-7777-777777777777",
      name: "Scrumban",
      definition: "A hybrid of Scrum and Kanban practices.",
    },
    {
      id: "88888888-8888-8888-8888-888888888888",
      name: "Extreme Programming",
      definition:
        "Agile method focused on high quality through engineering practices.",
    },
  ];

  for (const m of methodologies) {
    await prisma.methodology.upsert({
      where: { name: m.name },
      update: { definition: m.definition },
      create: m,
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seeding complete: subscriptions + methodologies");
  })
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
