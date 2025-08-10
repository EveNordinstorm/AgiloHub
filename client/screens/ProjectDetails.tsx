import { ScrollView } from "react-native";
import ProjectAccordion from "../components/Projects/Accordion/projectAccordion";

export default function ProjectDetailsScreen() {
  return (
    <ScrollView className="mx-5">
      <ProjectAccordion />
    </ScrollView>
  );
}
