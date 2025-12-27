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
import { Task } from "common/src/types/interfaces/task";
import { Project } from "common/src/types/interfaces/project";
import { useAppDispatch } from "common/src/hooks/hooks";
import { completeTask } from "common/src/redux/slices/taskSlice";

type TaskCardsProps = {
  tasks: Task[];
  projects: Project[];
};

type CardItemProps = Task & {
  projectTitle?: string;
};

export default function TaskCards({ tasks, projects }: TaskCardsProps) {
  if (tasks.length === 0) {
    return (
      <Text className="text-white text-lg/6 font-montserrat-semibold">
        No tasks found. {"\n"}Create one in the tasks screen to start earning
        points!
      </Text>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between">
      {tasks.map((task) => {
        const projectTitle =
          task.projectId &&
          projects.find((p) => p.id === task.projectId)?.title;
        return (
          <View key={task.id} className="w-full mb-5">
            <TaskCardItem {...task} projectTitle={projectTitle} />
          </View>
        );
      })}
    </View>
  );
}

export function TaskCardItem({
  id,
  title,
  points,
  description,
  deadline,
  projectTitle,
}: CardItemProps) {
  const dispatch = useAppDispatch();

  const handleComplete = () => {
    dispatch(completeTask(id));
    closeModal();
  };

  const scale = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);

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
                {new Date(deadline).toLocaleString(undefined, {
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

              {projectTitle && (
                <>
                  <Text className="font-montserrat-semibold text-lg text-white bg-darkBlue px-2 py-1 mt-8">
                    Project:
                  </Text>
                  <Text className="text-white font-montserrat-semibold text-lg mt-2 ml-2">
                    {projectTitle}
                  </Text>
                </>
              )}

              <Text className="font-montserrat-semibold text-lg text-white bg-darkBlue px-2 py-1 mt-6">
                Task Deadline:
              </Text>
              <View className="flex-row items-center gap-2 mt-3 ml-2">
                <Feather name="clock" color="white" size={24} />
                <Text className="text-white font-montserrat-semibold text-lg">
                  {new Date(deadline).toLocaleString(undefined, {
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
              <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue my-3 ml-2 self-start">
                <FontAwesome name="star" size={22} color="#F8E23B" />
                <Text className="text-yellow font-montserrat-bold text-xl ml-2">
                  {points}
                </Text>
              </View>
            </ScrollView>

            <Pressable
              onPress={closeModal}
              className="bg-primaryBlue mt-3 rounded"
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="pencil-square" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-4">
                  Edit Task
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleComplete}
              className="bg-green-600 mt-3 rounded"
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="check-circle" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-4">
                  Mark Complete
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={closeModal}
              className="bg-darkBlue mt-3 rounded"
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="times-circle" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-4">
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
