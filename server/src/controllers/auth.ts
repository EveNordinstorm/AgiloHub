import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { AuthRequest } from "../middleware/auth";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const result = await AuthService.registerUser(
        email,
        password,
        firstName,
        lastName
      );
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.loginUser(email, password);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async profile(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getUserById(req.userId!);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}
