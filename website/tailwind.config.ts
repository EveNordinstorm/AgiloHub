import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0047AB",
        darkBlue: "#171623",
        primaryPurple: "#726DB3",
        darkPurple: "#34324F",
        yellow: "#F8E23B",
      },
    },
  },
  plugins: [],
};

export default config;
