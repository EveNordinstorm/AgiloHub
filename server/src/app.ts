import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

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

export default app;
