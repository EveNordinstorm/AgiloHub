import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type MembersProps = {
  name: string;
};

export function Members({ name }: MembersProps) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="rounded-full bg-darkBlue py-2 px-3 self-start">
        <FontAwesome name="user" size={22} color="#726DB3" />
      </View>
      <Text className="font-montserrat-semibold text-xl text-white">
        {name}
      </Text>
    </View>
  );
}
