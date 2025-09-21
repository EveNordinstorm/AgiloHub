import { View, Text } from "react-native";

export default function ChatsScreen() {
  return (
    <View>
      <Text className="font-montserrat-bold text-center text-white text-3xl mb-5">
        Chats
      </Text>
      <View className="mx-5">
        <View className="bg-primaryPurple/25 p-6 rounded-2xl">
          <Text className="font-montserrat-semibold text-white">
            Coming Soon...
          </Text>
        </View>
      </View>
    </View>
  );
}
