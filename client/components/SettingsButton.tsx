import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { FontAwesome } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable onPress={() => navigation.navigate("Settings")}>
      <View>
        <FontAwesome className="mr-5" name="cog" size={24} color="white" />
      </View>
    </Pressable>
  );
}
