import { ScrollView, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector } from "common/src/hooks/hooks";
import { FontAwesome } from "@expo/vector-icons";
import ProjectAccordion from "../components/Projects/Accordion/projectAccordion";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "ProjectDetails">;

export default function ProjectDetailsScreen({ navigation, route }: Props) {
  const { projectId } = route.params;
  const projects = useAppSelector((state) => state.project.projects);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">Project not found</Text>
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
    </ScrollView>
  );
}
