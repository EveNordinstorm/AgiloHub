const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname, "../common")];

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    common: path.resolve(__dirname, "../common"),
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
