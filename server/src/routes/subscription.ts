import { Router } from "express";
import { subscriptionController } from "../controllers/subscription";

const router = Router();

router.get("/", subscriptionController.listTiers);
router.get("/:idOrName", subscriptionController.getTier);

export default router;
