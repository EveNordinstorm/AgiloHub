import { Response } from "express";
import { PointsService } from "../services/points";
import { AuthRequest } from "../middleware/auth";
import { PointsType } from "../../../common/src/types/enums/pointsType";

export class PointsController {
  static async getTotal(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const total = await PointsService.getUserTotal(userId);
      res.json({ total });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getHistory(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const limit = req.query.limit ? Number(req.query.limit) : 50;
      const history = await PointsService.getUserHistory(userId, limit);
      res.json(history);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async earn(req: AuthRequest, res: Response) {
    try {
      const { amount, description, type, meta } = req.body;

      const tx = await PointsService.earnPoints(
        req.userId!,
        amount,
        type as PointsType,
        description
      );

      const total = await PointsService.getUserTotal(req.userId!);
      res.json({ transaction: tx, total });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async spend(req: AuthRequest, res: Response) {
    try {
      const { amount, description, meta } = req.body;

      const tx = await PointsService.spendPoints(
        req.userId!,
        amount,
        description
      );

      const total = await PointsService.getUserTotal(req.userId!);
      res.json({ transaction: tx, total });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
