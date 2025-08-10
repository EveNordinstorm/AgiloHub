import { ScrollView, View, Text } from "react-native";
import ProjectAccordion from "../components/Projects/projectAccordion";

export default function ProjectsScreen() {
  return (
    <ScrollView className="mx-5">
      <View className="flex-row justify-center">
        <Text className="font-montserrat-bold text-white text-3xl">
          Projects
        </Text>
      </View>
      <ProjectAccordion />
    </ScrollView>
  );
}
