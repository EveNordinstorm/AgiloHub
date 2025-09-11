import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Next.js
      "http://localhost:19006", // Expo web
      "exp://127.0.0.1:19000", // Expo Go
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

export default app;
