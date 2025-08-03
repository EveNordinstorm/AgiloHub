import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type StatisticItemProps = {
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
  number: number;
  label: string;
};

function StatisticItem({ icon, number, label }: StatisticItemProps) {
  return (
    <View className="flex-row items-center">
      <View
        style={{ width: 40, justifyContent: "center", alignItems: "center" }}
      >
        <FontAwesome5 name={icon} size={34} color="#F8E23B" />
      </View>

      <View className="flex-row ml-4">
        <Text className="text-white font-montserrat-bold text-4xl">
          {number}
        </Text>
        <Text className="text-white font-montserrat-bold text-xl flex-shrink pr-5 pl-2">
          {label}
        </Text>
      </View>
    </View>
  );
}

export default function YourMonth() {
  const stats: StatisticItemProps[] = [
    { icon: "laptop-code", number: 3, label: "projects contributed to" },
    { icon: "check", number: 34, label: "tasks complete" },
    { icon: "github", number: 5, label: "pull requests submitted" },
    { icon: "bug", number: 4, label: "bugs resolved" },
  ];

  return (
    <View className="bg-darkPurple m-8 p-5">
      <Text className="text-white font-montserrat-bold text-2xl text-center mb-4">
        Your Month
      </Text>
      <View className="flex gap-4">
        {stats.map((item, index) => (
          <StatisticItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
}
