import { ScrollView, View, Text } from "react-native";
import { AgiloHubIcon } from "../components/AgiloHubIcon";
import { FreeStar } from "../components/TierStars/FreeStar";
import { ProStar } from "../components/TierStars/ProStar";
import { EnterpriseStar } from "../components/TierStars/EnterpriseStar";
import StreakWeek from "../components/Dashboard/StreakWeek";
import YourMonth from "../components/Dashboard/YourMonth";
import ShortCutCards from "../components/Dashboard/ShortCutCards";
import { useAppSelector } from "common/src/hooks/hooks";

const starMap: Record<string, React.ReactNode> = {
  Free: <FreeStar fill="#F8E23B" />,
  Pro: <ProStar fill="#F8E23B" />,
  Enterprise: <EnterpriseStar fill="#F8E23B" />,
};

export default function DashboardScreen() {
  const user = useAppSelector((state) => state.auth.user);

  const firstName = user?.firstName ?? "Forename";
  const lastName = user?.lastName ?? "Surname";
  const tier = user?.subscriptionTier?.tier ?? "Free";
  const tierStar = starMap[tier] ?? <FreeStar fill="#F8E23B" />;

  return (
    <ScrollView className="bg-darkBlue">
      <View className="flex-row items-center mt-5">
        <View className="w-24 h-28 mx-4">
          <AgiloHubIcon fill="#fff" />
        </View>
        <Text className="text-white text-3xl leading-[1.3] font-montserrat-bold">
          {firstName}
          {"\n"}
          {lastName}'s{"\n"}Agile Hub
        </Text>
      </View>

      <View className="flex-row items-center justify-center gap-2 mt-4 mb-8">
        <View className="w-8 h-8">{tierStar}</View>
        <Text className="text-white font-montserrat-semibold text-xl">
          {tier} plan
        </Text>
      </View>

      <StreakWeek />
      <YourMonth />
      <ShortCutCards />
    </ScrollView>
  );
}
