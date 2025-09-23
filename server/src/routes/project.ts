import { Router } from "express";
import { ProjectController } from "../controllers/project";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, ProjectController.create);
router.get("/", authMiddleware, ProjectController.list);
router.get("/:id", authMiddleware, ProjectController.get);

export default router;
