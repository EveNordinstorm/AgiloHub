import { View, Text } from "react-native";

type CardItemProps = {
  title: string;
  description: string;
};

export function ProjectOverview({ title, description }: CardItemProps) {
  return (
    <View>
      <Text className="text-white font-montserrat-bold text-lg mb-1">
        {title}
      </Text>
      <Text className="text-white font-montserrat-semibold text-base">
        {description}
      </Text>
    </View>
  );
}
