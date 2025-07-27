/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["MontserratAlternates-Regular"],
        "montserrat-bold": ["MontserratAlternates-Bold"],
        "montserrat-semibold": ["MontserratAlternates-SemiBold"],
      },
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
