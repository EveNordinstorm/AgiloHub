import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

interface FreeStarProps {
  style?: StyleProp<ViewStyle>;
}

export const FreeStar = ({
  style,
  fill = "currentColor",
}: FreeStarProps & { fill?: string }) => (
  <Svg style={style} fill={fill} viewBox="0 0 200 200">
    <Polygon points="118.67 118.67 200 100 118.67 81.33 100 0 81.34 81.33 0 100 81.34 118.67 100 200 118.67 118.67" />
  </Svg>
);
