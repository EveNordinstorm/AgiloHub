const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname, "../custom-component-library")];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../custom-component-library/node_modules"),
];

config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, "node_modules/react"),
  "react-native": path.resolve(__dirname, "node_modules/react-native"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
