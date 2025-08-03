import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

interface ProStarProps {
  style?: StyleProp<ViewStyle>;
}

export const ProStar = ({
  style,
  fill = "currentColor",
}: ProStarProps & { fill?: string }) => (
  <Svg style={style} fill={fill} viewBox="0 0 200 200">
    <Polygon points="112.92 112.91 200 100 112.92 87.08 100 0 87.09 87.08 0 100 87.09 112.91 100 200 112.92 112.91" />
    <Polygon points="100 112.74 149.34 149.34 112.74 100 149.34 50.65 100 87.25 50.65 50.65 87.25 100 50.65 149.34 100 112.74" />
  </Svg>
);
