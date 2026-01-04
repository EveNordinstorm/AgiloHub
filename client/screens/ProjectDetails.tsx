import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector, useAppDispatch } from "common/src/hooks/hooks";
import { deleteProject } from "common/src/redux/slices/projectSlice";
import { FontAwesome } from "@expo/vector-icons";
import ProjectAccordion from "../components/Projects/Accordion/projectAccordion";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "ProjectDetails">;

export default function ProjectDetailsScreen({ navigation, route }: Props) {
  const { projectId } = route.params;
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.project.projects);

  const project = projects.find((p) => p.id === projectId);

  const handleEdit = () => {
    if (!project) return;
    navigation.navigate("MainTabs", {
      screen: "Projects",
      params: { editProjectId: project.id },
    } as any);
  };

  const confirmDeleteProject = () => {
    Alert.alert(
      "Delete Project",
      "Are you sure you want to delete this project? This affects all members.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: handleDeleteProject },
      ]
    );
  };

  const handleDeleteProject = async () => {
    if (!project) return;
    try {
      await dispatch(deleteProject(project.id)).unwrap();
      navigation.goBack();
    } catch (err: any) {
      console.error("Failed to delete project:", err);
    }
  };

  if (!project) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg font-montserrat-semibold">
          Project not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="mx-5 mt-14">
      <View className="flex-row items-center">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Back to Projects
        </Text>
      </View>
      <ProjectAccordion project={project} />

      <Pressable onPress={handleEdit} className="bg-primaryBlue mt-5 rounded">
        <View className="flex-row items-center justify-center">
          <FontAwesome name="pencil-square" size={24} color="#fff" />
          <Text className="font-montserrat-semibold text-white text-xl px-3 py-4">
            Edit Project
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={confirmDeleteProject}
        className="bg-red-600 mt-4 rounded"
      >
        <View className="flex-row items-center justify-center">
          <FontAwesome name="trash" size={24} color="#fff" />
          <Text className="font-montserrat-semibold text-white text-xl px-3 py-4">
            Delete Project
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}
