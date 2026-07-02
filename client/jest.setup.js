// Jest setup file for mocking Expo and React Native modules

// Mock react-native-css-interop (optional dependency for NativeWind)
jest.mock("react-native-css-interop", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: jest.fn(),
    createInteropElement: React["createElement"].bind(React),
    cssInterop: (component) => component,
    remapProps: (component) => component,
    StyleSheet: { create: (styles) => styles },
    colorScheme: { get: () => "light" },
    rem: { value: 16 },
  };
});

// Mock expo-secure-store for token storage tests
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock react-native-reanimated for animation components
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

// Mock expo-linear-gradient as a simple component
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  FontAwesome: "FontAwesome",
  Feather: "Feather",
  MaterialIcons: "MaterialIcons",
}));
