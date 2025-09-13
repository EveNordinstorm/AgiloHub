import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { AuthRequest } from "../middleware/auth";

const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_COOKIE_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

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

      // set refresh cookie for web
      if (result.refreshToken) {
        res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, {
          httpOnly: true,
          secure: false, // dev
          sameSite: "lax",
          maxAge: REFRESH_COOKIE_AGE,
          path: "/",
        });
      }

      // send back only what client needs
      res.json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.loginUser(email, password);

      if (result.refreshToken) {
        res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, {
          httpOnly: true,
          secure: false, // dev
          sameSite: "lax",
          maxAge: REFRESH_COOKIE_AGE,
          path: "/",
        });
      }

      res.json({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const cookieToken = (req as any).cookies?.[REFRESH_COOKIE_NAME];
      const bodyToken = req.body?.refreshToken;
      const refreshToken = cookieToken || bodyToken;

      if (!cookieToken) {
        return res.json({ accessToken: null });
      }

      if (!refreshToken) {
        return res.status(400).json({ error: "No refresh token provided" });
      }

      const result = await AuthService.refreshToken(refreshToken);

      // set new cookie (rotated refresh token)
      if (result.refreshToken) {
        res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, {
          httpOnly: true,
          secure: false, // dev
          sameSite: "lax",
          maxAge: REFRESH_COOKIE_AGE,
          path: "/",
        });
      }

      res.json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    // clear refresh cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // dev
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logged out" });
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
