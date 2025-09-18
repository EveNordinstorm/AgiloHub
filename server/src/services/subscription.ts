import { PrismaClient } from "../../generated/prisma";
import { SubscriptionTier } from "../../generated/prisma";

const prisma = new PrismaClient();

export const subscriptionService = {
  // fetch all tiers
  async getAllTiers(): Promise<SubscriptionTier[]> {
    return prisma.subscriptionTier.findMany({
      orderBy: { createdAt: "asc" },
    });
  },

  async getTierById(id: string): Promise<SubscriptionTier | null> {
    return prisma.subscriptionTier.findUnique({ where: { id } });
  },

  async getTierByName(tier: string): Promise<SubscriptionTier | null> {
    return prisma.subscriptionTier.findUnique({ where: { tier } });
  },
};
