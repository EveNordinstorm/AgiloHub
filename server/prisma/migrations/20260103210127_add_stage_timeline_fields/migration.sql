-- CreateEnum
CREATE TYPE "StageIcon" AS ENUM ('ARROW_DOWN', 'REFRESH_CW', 'FLAG');

-- DropForeignKey
ALTER TABLE "ProjectStage" DROP CONSTRAINT "ProjectStage_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectStage" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "completedById" TEXT,
ADD COLUMN     "icon" "StageIcon" NOT NULL DEFAULT 'ARROW_DOWN',
ALTER COLUMN "pointsEarned" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
