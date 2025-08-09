// tamagui.config.ts
import { createTamagui, type CreateTamaguiProps } from "@tamagui/core";
import { config as defaultConfig } from "@tamagui/config/v3";
import { themes } from "@tamagui/themes";

const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes,
} as CreateTamaguiProps);

export type AppConfig = typeof tamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
