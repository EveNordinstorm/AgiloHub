// Jest setup file for mocking Expo and React Native modules
// Based on official Jest React Native documentation: https://jestjs.io/docs/tutorial-react-native

// Note: Custom matchers are now built into @testing-library/react-native v12.4+
// No need to import @testing-library/jest-native separately

// Mock react-native-css-interop (optional dependency for NativeWind)
jest.mock('react-native-css-interop', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock expo-secure-store for token storage tests
// This is a native module that needs to be mocked in Jest environment
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock react-native-reanimated for animation components
// Uses the official mock provided by the library
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

// Mock expo-linear-gradient as a simple component
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
  Feather: 'Feather',
  MaterialIcons: 'MaterialIcons',
}));
