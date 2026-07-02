// Jest configuration for React Native/Expo
// Based on official Jest documentation: https://jestjs.io/docs/tutorial-react-native

module.exports = {
  // Use react-native preset which includes essential React Native transformations
  preset: 'react-native',

  // Setup files to run after Jest environment is set up
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transform node_modules that need compilation (React Native packages)
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-redux|@reduxjs/toolkit|react-native-css-interop|immer)/)',
  ],

  // Map module paths for imports
  moduleNameMapper: {
    // Map 'common' imports to the shared package
    '^common/(.*)$': '<rootDir>/../common/src/$1',
    // Mock environment variables
    '^@env$': '<rootDir>/__mocks__/@env.js',
    // Mock react-native-css-interop to prevent native module initialization errors
    '^react-native-css-interop$': '<rootDir>/__mocks__/react-native-css-interop.js',
    // Force a single React instance across all packages (prevents hook context errors
    // when react-redux in common/node_modules uses a different React than the test renderer)
    '^react$': '<rootDir>/node_modules/react',
    '^react-native$': '<rootDir>/node_modules/react-native',
  },

  // Collect coverage from these files
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'screens/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],

  // Test file patterns
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],

  // File extensions Jest will look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
