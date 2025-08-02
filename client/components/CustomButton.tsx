import { Pressable, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  bgColor?: string;
  textColor?: string;
}

export const CustomButton = ({
  onPress,
  text,
  bgColor = "bg-primaryBlue",
  textColor = "text-white",
}: CustomButtonProps) => {
  return (
    <Pressable
      className={`px-4 py-3 rounded-full ${bgColor}`}
      onPress={onPress}
    >
      <Text className={`text-xl text-center font-montserrat-bold ${textColor}`}>
        {text}
      </Text>
    </Pressable>
  );
};
