module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "nativewind/babel",
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],

    // plugins: ["react-native-reanimated/plugin"],

    // overrides: [
    //   {
    //     test: /(\.tamagui\.(js|ts|tsx))$/,

    //     plugins: [
    //       [
    //         "@tamagui/babel-plugin",
    //         {
    //           config: "./tamagui.config.ts",
    //           components: ["tamagui", "@tamagui/core", "@tamagui/themes"],
    //           logTimings: true,
    //         },
    //       ],
    //     ],
    //   },
    // ],
  };
};
