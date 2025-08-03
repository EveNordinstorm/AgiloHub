import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function StreakDay() {
  return (
    <View className="bg-darkPurple rounded-lg items-center justify-center flex-1 aspect-square max-w-[70px]">
      <FontAwesome name="check-circle" size={40} color="#726DB3" />
    </View>
  );
}
