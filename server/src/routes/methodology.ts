import { Router } from "express";
import { getMethodologies } from "../controllers/methodology";

const router = Router();

router.get("/", getMethodologies);

export default router;
