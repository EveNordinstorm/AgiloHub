import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .then(() => {
    console.log("Subscription tiers seeded");
  })
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
