import { ScrollView, View, Text } from "react-native";
import { AgiloHubIcon } from "../components/AgiloHubIcon";

export default function DashboardScreen() {
  return (
    <ScrollView className="bg-darkBlue">
      <View className="flex-row items-center py-10">
        <View className="w-24 h-42 mx-4">
          <AgiloHubIcon fill="#fff" />
        </View>
        <Text className="text-white text-3xl leading-[1.3] font-montserrat-bold">
          Eve{"\n"}Nordinstorm's{"\n"}Agile Hub
        </Text>
      </View>
    </ScrollView>
  );
}
