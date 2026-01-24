const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^common/(.*)$": "<rootDir>/../common/src/$1",
    "^react$": "<rootDir>/node_modules/react",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "^react/(.*)$": "<rootDir>/node_modules/react/$1",
    "^react-dom/(.*)$": "<rootDir>/node_modules/react-dom/$1",
  },

  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/app/**/*.{ts,tsx}",
    "!src/app/layout.tsx",
    "!**/*.d.ts",
  ],

  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);
