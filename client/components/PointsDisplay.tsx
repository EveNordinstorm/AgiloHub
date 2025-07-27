import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function PointsDisplay() {
  return (
    <View className="ml-5 flex-row gap-2 bg-primaryBlue px-2 rounded-full py-1 items-center">
      <FontAwesome name="star" size={22} color="#F8E23B" />
      <Text className="text-yellow font-montserrat-bold text-lg">1000</Text>
    </View>
  );
}
