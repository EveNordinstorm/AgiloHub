import { ScrollView, View, Text } from "react-native";
import { AgiloHubIcon } from "../components/AgiloHubIcon";
import { FreeStar } from "../components/TierStars/FreeStar";
import StreakWeek from "../components/Dashboard/StreakWeek";

export default function DashboardScreen() {
  return (
    <ScrollView className="bg-darkBlue">
      <View className="flex-row items-center mt-5">
        <View className="w-24 h-28 mx-4">
          <AgiloHubIcon fill="#fff" />
        </View>
        <Text className="text-white text-3xl leading-[1.3] font-montserrat-bold">
          Eve{"\n"}Nordinstorm's{"\n"}Agile Hub
        </Text>
      </View>

      <View className="flex-row items-center justify-center gap-2 mt-4 mb-8">
        <View className="w-8 h-8">
          <FreeStar fill="#F8E23B" />
        </View>
        <Text className="text-white font-montserrat-semibold text-xl">
          Free Plan
        </Text>
      </View>

      <StreakWeek />
    </ScrollView>
  );
}
