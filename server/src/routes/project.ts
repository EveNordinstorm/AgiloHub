import { Router } from "express";
import { ProjectController } from "../controllers/project";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, ProjectController.create);
router.get("/", authMiddleware, ProjectController.list);
router.get("/:id", authMiddleware, ProjectController.get);
router.put("/:id", authMiddleware, ProjectController.update);
router.delete("/:id", authMiddleware, ProjectController.delete);

// Stage routes
router.get("/:projectId/stages", authMiddleware, ProjectController.getStages);
router.post("/:projectId/stages", authMiddleware, ProjectController.addStage);
router.put("/stages/:stageId", authMiddleware, ProjectController.updateStage);
router.delete("/stages/:stageId", authMiddleware, ProjectController.deleteStage);
router.post("/stages/:stageId/complete", authMiddleware, ProjectController.completeStage);

export default router;
