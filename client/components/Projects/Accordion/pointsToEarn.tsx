import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type PointsToEarnProps = {
  totalPoints: number;
};

export function PointsToEarn({ totalPoints }: PointsToEarnProps) {
  return (
    <View className="h-36">
      <Text className="font-montserrat-semibold text-lg text-white mb-3">
        By completing all tasks and timeline objectives in this project, each
        team member will earn:
      </Text>
      <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue self-start">
        <FontAwesome name="star" size={22} color="#F8E23B" />
        <Text className="text-yellow font-montserrat-bold text-lg ml-2">
          {totalPoints}
        </Text>
      </View>
    </View>
  );
}
