module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["nativewind/babel", "babel-preset-expo"],
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
          logTimings: true,
        },
      ],
    ],
  };
};
