const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname, "../common")];

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    common: path.resolve(__dirname, "../common"),
    react: path.resolve(__dirname, "node_modules/react"),
    "react-native": path.resolve(__dirname, "node_modules/react-native"),
    "react-native-css-interop": path.resolve(
      __dirname,
      "node_modules/react-native-css-interop"
    ),
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
