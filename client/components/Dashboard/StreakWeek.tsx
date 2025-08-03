import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StreakDay from "./StreakDay";

export default function StreakWeek() {
  return (
    <View className="mx-8">
      <View className="flex-row justify-between gap-2">
        <StreakDay />
        <StreakDay />
        <StreakDay />
        <StreakDay />
        <StreakDay />
      </View>

      <View className="flex-row items-center justify-between mt-2">
        <Text className="text-white font-montserrat-semibold text-lg">
          Work Week Streak
        </Text>
        <View className="flex-row items-center gap-1">
          <FontAwesome name="star" size={20} color="#F8E23B" />
          <Text className="text-white font-montserrat-bold text-xl">+10</Text>
        </View>
      </View>
    </View>
  );
}
