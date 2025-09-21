import { View, Text, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CardItemProps = {
  title: string;
  points: number;
  description: string;
  deadline: Date;
  onPress: () => void;
};

export function TaskCardItem({
  title,
  points,
  description,
  deadline,
  onPress,
}: CardItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 20,
      tension: 150,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 10,
      tension: 100,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View className="bg-darkPurple p-5">
          <View className="flex-row justify-between">
            <Text
              className="text-white font-montserrat-bold text-xl mb-2 flex-1 flex-shrink"
              numberOfLines={0}
            >
              {title}
            </Text>

            <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue ml-2 self-start">
              <FontAwesome name="star" size={22} color="#F8E23B" />
              <Text className="text-yellow font-montserrat-bold text-lg ml-2">
                {points}
              </Text>
            </View>
          </View>

          <Text className="text-white font-montserrat">{description}</Text>

          <View className="flex-row justify-end items-center gap-2 mt-2">
            <Text className="text-white font-montserrat-semibold text-right">
              {deadline.toLocaleString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Feather name="clock" color="white" size={24} />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function TaskCards() {
  const navigation = useNavigation<NavigationProp>(); // TO REMOVE

  const cards: CardItemProps[] = [
    {
      title: "Build nav bar component",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
      onPress: () => navigation.navigate("ProjectDetails"), // CHANGE THIS TO OPEN MODAL
    },
    {
      title: "Build nav bar component",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
      onPress: () => navigation.navigate("ProjectDetails"), // CHANGE THIS TO OPEN MODAL
    },
    {
      title: "Build nav bar component",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
      onPress: () => navigation.navigate("ProjectDetails"), // CHANGE THIS TO OPEN MODAL
    },
    {
      title: "Build nav bar component",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
      onPress: () => navigation.navigate("ProjectDetails"), // CHANGE THIS TO OPEN MODAL
    },
  ];

  return (
    <View className="flex-row flex-wrap justify-between">
      {cards.map((item, index) => (
        <View key={index} className="w-full mb-5">
          <TaskCardItem {...item} />
        </View>
      ))}
    </View>
  );
}
