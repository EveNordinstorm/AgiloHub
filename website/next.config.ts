import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "./src"),
      common: path.resolve(__dirname, "../common"),
    };
    return config;
  },
};

export default nextConfig;
