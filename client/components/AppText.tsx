import { Text, TextProps, TextStyle } from "react-native";

export function AppText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "MontserratAlternates-Regular" },
        props.style as TextStyle,
      ]}
    />
  );
}
