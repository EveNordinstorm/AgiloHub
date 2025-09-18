import { Request, Response } from "express";
import { subscriptionService } from "../services/subscription";

export const subscriptionController = {
  async listTiers(req: Request, res: Response) {
    const tiers = await subscriptionService.getAllTiers();
    return res.json(tiers);
  },

  async getTier(req: Request, res: Response) {
    const { idOrName } = req.params;
    // fetch by id or tier name
    let tier = null;
    if (idOrName.length === 36) {
      tier = await subscriptionService.getTierById(idOrName);
    }
    if (!tier) {
      tier = await subscriptionService.getTierByName(idOrName);
    }
    if (!tier) return res.status(404).json({ message: "Tier not found" });
    return res.json(tier);
  },
};
