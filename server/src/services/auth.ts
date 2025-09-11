import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { randomBytes } from "crypto";

dotenv.config();

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export class AuthService {
  private static async issueRefreshToken(userId: string) {
    const refreshToken = randomBytes(64).toString("hex");
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 30); // 30 days

    // delete old refresh tokens
    await prisma.refreshToken.deleteMany({ where: { userId } });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: refreshExpiry,
      },
    });

    return refreshToken;
  }

  static async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const normalisedEmail = email.toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });
    if (existing) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: normalisedEmail,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = await this.issueRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  static async loginUser(email: string, password: string) {
    const normalisedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });
    if (!user) throw new Error("Email not recognised");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Incorrect password");

    // Access token
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = await this.issueRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  static async refreshToken(token: string) {
    const stored = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new Error("Invalid or expired refresh token");
    }

    // rotate refresh token
    const newRefreshToken = await this.issueRefreshToken(stored.userId);

    const newAccessToken = jwt.sign({ userId: stored.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });

    return {
      user: stored.user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }
}
