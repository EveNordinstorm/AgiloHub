import { Pressable, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
}

export const CustomButton = ({
  onPress,
  text,
  bgColor = "bg-primaryBlue",
  textColor = "text-white",
  textSize = "text-xl",
}: CustomButtonProps) => {
  return (
    <Pressable
      className={`px-4 py-3 rounded-full ${bgColor}`}
      onPress={onPress}
    >
      <Text
        className={`text-center font-montserrat-bold ${textColor} ${textSize}`}
      >
        {text}
      </Text>
    </Pressable>
  );
};
