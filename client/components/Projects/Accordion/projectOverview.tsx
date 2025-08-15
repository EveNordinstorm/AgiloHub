import { View, Text } from "react-native";

type CardItemProps = {
  title: string;
  description: string;
};

export function ProjectOverview({ title, description }: CardItemProps) {
  return (
    <View className="w-full">
      <View className="bg-primaryBlue p-3 mb-2">
        <Text className="text-white font-montserrat-bold text-xl">{title}</Text>
      </View>

      <Text className="text-white font-montserrat-semibold text-base p-2">
        {description}
      </Text>
    </View>
  );
}
