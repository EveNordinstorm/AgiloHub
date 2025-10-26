// server/services/points.ts
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export class PointsService {
  static async getUserTotal(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true },
    });
    return user?.points ?? 0;
  }

  static async getUserTotalFromTransactions(userId: string) {
    const result = await prisma.pointsTransaction.aggregate({
      where: { userId },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  }

  static async getUserHistory(userId: string, limit = 50) {
    return prisma.pointsTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        task: {
          select: { id: true, title: true, type: true },
        },
        projectStage: {
          select: { id: true, description: true, stageNumber: true },
        },
      },
    });
  }
}
