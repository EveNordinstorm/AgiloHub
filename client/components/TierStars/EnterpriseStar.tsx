import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

interface EnterpriseStarProps {
  style?: StyleProp<ViewStyle>;
}

export const EnterpriseStar = ({
  style,
  fill = "currentColor",
}: EnterpriseStarProps & { fill?: string }) => (
  <Svg style={style} fill={fill} viewBox="0 0 200 200">
    <Polygon points="100 0 116.06 71.03 180.19 39.62 136.07 96.76 200 128.62 128.92 128.87 144.51 200 100 143.15 55.5 200 71.09 128.87 0 128.62 63.93 96.76 19.82 39.62 83.95 71.03 100 0" />
  </Svg>
);
