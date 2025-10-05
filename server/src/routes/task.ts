import { Router } from "express";
import { TaskController } from "../controllers/task";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, TaskController.create);
router.get("/", authMiddleware, TaskController.list);
router.get("/:id", authMiddleware, TaskController.get);
router.get("/project/:projectId", authMiddleware, TaskController.getByProject);

export default router;
