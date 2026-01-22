// Jest configuration for Next.js
// Based on official Next.js documentation: https://nextjs.org/docs/app/building-your-application/testing/jest

const nextJest = require('next/jest');

// Create Jest config using next/jest transformer
// This automatically configures Next.js compilation, CSS/image imports, and environment variables
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.ts and .env files
  dir: './',
});

// Custom Jest configuration
const customJestConfig = {
  // Setup file to run after Jest environment is initialized
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Use jsdom test environment for DOM testing (React components)
  testEnvironment: 'jsdom',

  // Module path aliases to match tsconfig.json paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^common$': '<rootDir>/../common/src',
    '^common/(.*)$': '<rootDir>/../common/src/$1',
  },

  // Collect coverage from these files
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/app/**/*.{ts,tsx}',
    '!src/app/layout.tsx',
    '!**/*.d.ts',
  ],

  // Test file patterns
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};

// Export Jest config with Next.js integration
module.exports = createJestConfig(customJestConfig);
