import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SettingsButton() {
  return (
    <View>
      <FontAwesome name="cog" size={20} color="black" />
    </View>
  );
}
