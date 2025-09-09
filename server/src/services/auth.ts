import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export class AuthService {
  static async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const normalisedEmail = email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });
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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  }

  static async loginUser(email: string, password: string) {
    const normalisedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });
    if (!user) throw new Error("Email not recognised");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Incorrect password");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }
}
