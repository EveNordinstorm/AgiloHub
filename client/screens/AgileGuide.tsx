import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any>;

export default function AgileGuideScreen({ navigation }: Props) {
  return (
    <View className="w-full h-full bg-darkBlue py-14 px-5">
      <View className="flex-row items-center mb-10">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Go Back
        </Text>
      </View>

      <Text className="text-3xl text-center mb-6 text-white font-montserrat-bold">
        Agile Guide
      </Text>
    </View>
  );
}
