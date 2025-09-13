import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get("/profile", authMiddleware, AuthController.profile);

export default router;
