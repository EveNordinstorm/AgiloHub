import { View, Text } from "react-native";

type CardItemProps = {
  title: string;
  description: string;
};

export function ProjectOverview({ title, description }: CardItemProps) {
  return (
    <View className="p-3">
      <Text className="text-white font-montserrat-bold text-lg">{title}</Text>
      <Text className="text-white font-montserrat-semibold text-base">
        {description}
      </Text>
    </View>
  );
}
