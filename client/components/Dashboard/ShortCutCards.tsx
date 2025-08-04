import { View, Text, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CardItemProps = {
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
  title: string;
  onPress: () => void;
};

export function ShortCutCardItem({ icon, title, onPress }: CardItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
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
        <LinearGradient
          colors={["#34324F", "#726DB3"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="flex items-center justify-center p-2"
          style={{ aspectRatio: 1 }}
        >
          <FontAwesome5 name={icon} size={36} color="#FFF" />
          <Text className="text-white font-montserrat-bold text-xl text-center mt-2">
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function ShortCutCards() {
  const navigation = useNavigation<NavigationProp>();

  const cards: CardItemProps[] = [
    {
      icon: "chess-board",
      title: "Agile\nOverview",
      onPress: () => navigation.navigate("AgileGuide"),
    },
    {
      icon: "chess-queen",
      title: "Project\nIdeas",
      onPress: () => navigation.navigate("Projects"),
    },
    {
      icon: "chess-pawn",
      title: "Task\nIdeas",
      onPress: () => navigation.navigate("Tasks"),
    },
    {
      icon: "chess",
      title: "Add\nPeople",
      onPress: () => navigation.navigate("Members"),
    },
  ];

  return (
    <View className="mx-8 mb-4">
      <View className="flex-row flex-wrap justify-between">
        {cards.map((item, index) => (
          <View
            key={index}
            className="mb-4"
            style={{
              width: "48%",
              aspectRatio: 1,
            }}
          >
            <ShortCutCardItem {...item} />
          </View>
        ))}
      </View>
    </View>
  );
}
