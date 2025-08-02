import React from "react";
import Svg, { Polygon, Path } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

interface AgiloHubIconProps {
  style?: StyleProp<ViewStyle>;
}

export const AgiloHubIcon = ({
  style,
  fill = "currentColor",
}: AgiloHubIconProps & { fill?: string }) => (
  <Svg style={style} fill={fill} viewBox="0 0 100 130.19">
    <Polygon points="93.87 61.34 93.87 49.8 87.15 49.83 75.54 61.42 93.87 61.34" />
    <Polygon points="6.13 125.36 11.45 125.36 40.22 96.66 6.13 96.73 6.13 125.36" />
    <Path d="M60.49,76.44l15.05-15.01-25.39.12,14.49-11.58,22.52-.13,6.39-6.38c-.11-.95-.26-1.89-.43-2.82l-16.96.11,9.39-7.51,5.5-.04c-6.26-16.58-22.27-28.37-41.04-28.37h0C25.77,4.83,6.13,24.47,6.13,48.7v48.04l25.25-20.19,29.1-.11Z" />
    <Polygon points="93.87 70.82 89.72 76.33 93.87 76.32 93.87 70.82" />
    <Polygon points="74.48 96.59 52.83 125.36 93.87 125.36 93.87 96.54 74.48 96.59" />
    <Polygon points="60.49 76.44 40.22 96.66 74.48 96.59 89.72 76.33 60.49 76.44" />
  </Svg>
);
