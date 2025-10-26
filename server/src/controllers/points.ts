import { Response } from "express";
import { PointsService } from "../services/points";
import { AuthRequest } from "../middleware/auth";

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
}
