import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function TaskHistoryScreen({ navigation }: Props) {
  return (
    <View>
      <View className="flex-row items-center mt-14 mb-5 mx-5">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Exit Task History
        </Text>
      </View>

      <Text className="font-montserrat-bold text-center text-white text-3xl mb-5">
        My Completed Tasks
      </Text>

      <View className="mx-5 mt-3 gap-5">
        <View className="bg-primaryPurple/25 p-6 rounded-2xl">
          <Text className="font-montserrat-semibold text-white">
            Coming Soon...
          </Text>
        </View>
      </View>
    </View>
  );
}
