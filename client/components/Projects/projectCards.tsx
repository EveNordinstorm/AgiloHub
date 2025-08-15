import { View, Text, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CardItemProps = {
  title: string;
  methodology: string;
  techStack: string[];
  onPress: () => void;
};

export function ProjectCardItem({
  title,
  methodology,
  techStack,
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
        <View className="bg-darkPurple p-3">
          <View className="bg-primaryBlue p-5">
            <Text className="text-white font-montserrat-bold text-2xl mb-2">
              {title}
            </Text>
            <View className="bg-yellow py-1 px-3 mr-auto">
              <Text className="font-montserrat-bold text-black text-lg">
                {methodology}
              </Text>
            </View>
          </View>
          <View className="px-2 mt-4">
            <View className="flex-row flex-wrap">
              {techStack.map((item, index) => (
                <View key={`${item}-${index}`} className="mr-2 mb-2">
                  <Text className="text-white text-lg font-montserrat-semibold bg-darkBlue rounded-full px-3 py-1">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="flex-row justify-end">
            <Feather name="chevron-right" color="white" size={24} />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function ProjectCards() {
  const navigation = useNavigation<NavigationProp>();

  const cards: CardItemProps[] = [
    {
      title: "SaaS Website",
      methodology: "LEAN",
      techStack: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"],
      onPress: () => navigation.navigate("ProjectDetails"),
    },
    {
      title: "React Native App",
      methodology: "Scrum",
      techStack: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
      onPress: () => navigation.navigate("ProjectDetails"),
    },
    {
      title: "eCommerce Store",
      methodology: "Kanban",
      techStack: ["Angular", "Express", "Node.js", "MongoDB"],
      onPress: () => navigation.navigate("ProjectDetails"),
    },
    {
      title: "Social Media Site",
      methodology: "Scrumban",
      techStack: ["Vue", ".NET Core", "Express", "SQL"],
      onPress: () => navigation.navigate("ProjectDetails"),
    },
  ];

  return (
    <View className="flex-row flex-wrap justify-between">
      {cards.map((item, index) => (
        <View key={index} className="w-full mb-5">
          <ProjectCardItem {...item} />
        </View>
      ))}
    </View>
  );
}
