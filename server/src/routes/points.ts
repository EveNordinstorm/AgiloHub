import { Router } from "express";
import { PointsController } from "../controllers/points";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/total", authMiddleware, PointsController.getTotal);
router.get("/history", authMiddleware, PointsController.getHistory);
router.post("/earn", authMiddleware, PointsController.earn);
router.post("/spend", authMiddleware, PointsController.spend);

export default router;
