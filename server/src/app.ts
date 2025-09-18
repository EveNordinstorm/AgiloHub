import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import subscriptionRoutes from "./routes/subscription";
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
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/subscriptions", subscriptionRoutes);

export default app;
