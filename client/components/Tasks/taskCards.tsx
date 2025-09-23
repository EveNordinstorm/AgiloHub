import {
  ScrollView,
  View,
  Text,
  Pressable,
  Animated,
  Modal,
} from "react-native";
import { useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

type CardItemProps = {
  title: string;
  points: number;
  description: string;
  deadline: Date;
};

export function TaskCardItem({
  title,
  points,
  description,
  deadline,
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

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable
        onPress={openModal}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <View className="bg-darkBlue p-5">
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

            <Text
              className="font-montserrat text-lg text-white mt-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-darkPurple rounded-t-lg h-[80%] w-[95%] mx-auto p-8">
            <ScrollView>
              <Text className="font-montserrat-bold text-2xl text-center text-white mb-8">
                Task Details
              </Text>
              <Text className="font-montserrat-bold text-xl text-white">
                {title}
              </Text>
              <Text className="font-montserrat text-lg text-white mt-2">
                {description}
              </Text>

              <Text className="font-montserrat-semibold text-lg text-white bg-darkBlue px-2 py-1 mt-8">
                Task Deadline:
              </Text>
              <View className="flex-row items-center gap-2 mt-3 ml-2">
                <Feather name="clock" color="white" size={24} />
                <Text className="text-white font-montserrat-semibold text-lg">
                  {deadline.toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <Text className="font-montserrat-semibold text-lg text-white bg-darkBlue px-2 py-1 mt-6">
                Complete for:
              </Text>
              <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue mt-3 ml-2 self-start">
                <FontAwesome name="star" size={22} color="#F8E23B" />
                <Text className="text-yellow font-montserrat-bold text-xl ml-2">
                  {points}
                </Text>
              </View>
            </ScrollView>

            <Pressable onPress={closeModal} className="bg-red-500 mt-4 rounded">
              <View className="flex-row items-center justify-center">
                <FontAwesome name="times-circle" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-5">
                  Delete Task
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={closeModal}
              className="bg-green-500 mt-4 rounded"
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="check-circle" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-5">
                  Mark Complete
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={closeModal}
              className="bg-primaryPurple mt-4 rounded"
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="times-circle" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-5">
                  Close Task Details
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function TaskCards() {
  const cards: CardItemProps[] = [
    {
      title: "Build nav bar component",
      points: 50,
      description:
        "Use Shadcn menu component, then style with Tailwind to AgiloHub branding. Refer to brand guidelines document.",
      deadline: new Date("2025-09-21T15:30:00"),
    },
    {
      title: "Task two",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
    },
    {
      title: " Another task",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
    },
    {
      title: "Yet another task",
      points: 50,
      description: "Use Shadcn menu component, then style with Tailwind to...",
      deadline: new Date("2025-09-21T15:30:00"),
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
