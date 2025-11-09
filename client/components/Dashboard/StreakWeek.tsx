import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAppSelector } from "common/src/hooks/hooks";
import StreakDay from "./StreakDay";
import { Weekday } from "common/src/redux/slices/loginStreakSlice";

export default function StreakWeek() {
  const { daysChecked, currentPoints } = useAppSelector(
    (state) => state.streak
  );

  const days: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const checkedCount = daysChecked.length;

  return (
    <View className="mx-8">
      <Text className="text-white font-montserrat-semibold text-xl mb-1">
        Work Week Login Streak
      </Text>
      <View className="flex-row justify-between gap-2">
        {days.map((day) => (
          <StreakDay key={day} checked={daysChecked.includes(day)} />
        ))}
      </View>

      <View className="flex-row items-center justify-between mt-2">
        <View className="bg-primaryBlue px-3 rounded-full">
          <Text className="text-white font-montserrat-bold text-lg">
            {checkedCount} day{checkedCount !== 1 ? "s" : ""}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <FontAwesome name="star" size={20} color="#F8E23B" />
          <Text className="text-white font-montserrat-bold text-xl">
            +{currentPoints}
          </Text>
        </View>
      </View>
    </View>
  );
}
