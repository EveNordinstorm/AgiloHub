-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionTierId" TEXT;

-- CreateTable
CREATE TABLE "SubscriptionTier" (
    "id" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "strapline" TEXT,
    "features" TEXT[],
    "description" TEXT,
    "buttonText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionTier_tier_key" ON "SubscriptionTier"("tier");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionTierId_fkey" FOREIGN KEY ("subscriptionTierId") REFERENCES "SubscriptionTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
