import { ScrollView, View, Text } from "react-native";
import Accordion from "../../custom-component-library/accordion/Accordion.native";
import { AccordionItem } from "custom-component-library/accordion/AccordionSlice";

export default function ProjectsScreen() {
  const items: AccordionItem[] = [
    { title: "Project 1", content: "Details for project 1" },
    { title: "Project 2", content: "Details for project 2" },
    { title: "Project 3", content: "Details for project 3" },
  ];

  return (
    <ScrollView className="p-4">
      <Text className="text-white font-montserrat-bold text-2xl mb-4">
        Projects
      </Text>

      <Accordion items={items} />

      <View className="mt-10">
        <Text className="text-white">More stuff here...</Text>
      </View>
    </ScrollView>
  );
}
