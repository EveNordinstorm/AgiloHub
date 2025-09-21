import { ScrollView, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type MembersProps = {
  name: string;
  role: string;
};

export function Members({ name, role }: MembersProps) {
  return (
    <View className="flex-row gap-2">
      <View className="rounded-full bg-darkBlue py-2 px-3 self-start">
        <FontAwesome name="user" size={22} color="#726DB3" />
      </View>
      <View>
        <Text className="font-montserrat-semibold text-xl text-white">
          {name}
        </Text>
        <Text className="font-montserrat text-lg text-white">{role}</Text>
      </View>
    </View>
  );
}
