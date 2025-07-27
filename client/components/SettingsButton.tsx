import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SettingsButton() {
  return (
    <View>
      <FontAwesome className="mr-5" name="cog" size={24} color="white" />
    </View>
  );
}
