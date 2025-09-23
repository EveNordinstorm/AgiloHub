import { Request, Response } from "express";
import { getAllMethodologies } from "../services/methodology";

export const getMethodologies = async (req: Request, res: Response) => {
  try {
    const methodologies = await getAllMethodologies();
    res.json(methodologies);
  } catch (err) {
    console.error("Error fetching methodologies:", err);
    res.status(500).json({ error: "Failed to fetch methodologies" });
  }
};
