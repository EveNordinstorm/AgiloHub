import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import { PointsType } from "../../../common/src/types/enums/pointsType";

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

  private static async createTransaction(
    userId: string,
    amount: number,
    type: PointsType,
    description: string
  ) {
    return prisma.pointsTransaction.create({
      data: {
        userId,
        amount,
        type,
        description,
      },
    });
  }

  static async earnPoints(
    userId: string,
    amount: number,
    type: PointsType,
    description: string
  ) {
    if (amount <= 0) throw new Error("Points must be positive.");

    // Update total
    await prisma.user.update({
      where: { id: userId },
      data: { points: { increment: amount } },
    });

    return this.createTransaction(userId, amount, type, description);
  }

  static async spendPoints(
    userId: string,
    amount: number,
    description = "Spent points"
  ) {
    if (amount <= 0) throw new Error("Points must be positive.");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true },
    });

    if (!user) throw new Error("User not found.");
    if (user.points < amount) throw new Error("Not enough points.");

    await prisma.user.update({
      where: { id: userId },
      data: { points: { decrement: amount } },
    });

    return this.createTransaction(
      userId,
      -amount,
      PointsType.OTHER,
      description
    );
  }
}
