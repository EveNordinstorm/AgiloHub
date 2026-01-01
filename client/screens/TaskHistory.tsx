import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TaskCards from "../components/Tasks/taskCards";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import { fetchCompletedTasks } from "common/src/redux/slices/taskSlice";

type Props = NativeStackScreenProps<any>;

export default function TaskHistoryScreen({ navigation }: Props) {
  const { projects } = useAppSelector((state) => state.project);
  const { completedTasks } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompletedTasks()).then((res) =>
      console.log("Completed tasks:", res)
    );
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row items-center mt-14 mb-5 mx-5">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Exit Task History
        </Text>
      </View>

      <Text className="font-montserrat-bold text-center text-white text-3xl mb-5">
        My Completed Tasks
      </Text>

      <ScrollView
        style={{ flex: 1, marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 190 }}
        showsVerticalScrollIndicator={false}
      >
        <TaskCards tasks={completedTasks ?? []} projects={projects} />
      </ScrollView>
    </View>
  );
}
