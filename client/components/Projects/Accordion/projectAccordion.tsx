import { useState } from "react";
import { Text, ScrollView, View, LayoutAnimation } from "react-native";
import { FontAwesome5, FontAwesome, Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import { Project } from "common/src/types/interfaces/project";
import { ProjectOverview } from "./projectOverview";
import { TechnologyStack } from "./technologyStack";
import { Methodology } from "./methodology";
import { Timeline } from "./timeline";
import { Members } from "./members";
import TaskCards from "../../Tasks/taskCards";
import { PointsToEarn } from "./pointsToEarn";

type Section = {
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

type Props = {
  project: Project;
};

export default function ProjectAccordion({ project }: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const SECTIONS: Section[] = [
    {
      title: "Project Overview",
      icon: <FontAwesome5 name="project-diagram" color="white" size={20} />,
      content: (
        <ProjectOverview
          title={project.title}
          description={project.description || "No description provided."}
        />
      ),
    },
    {
      title: "Technology Stack",
      icon: <FontAwesome5 name="buffer" color="white" size={20} />,
      content: (
        <TechnologyStack
          techStack={["React Native", "TypeScript", "Node.js", "PostgreSQL"]}
        />
      ),
    },
    {
      title: "Methodology",
      icon: <FontAwesome5 name="chess-board" color="white" size={20} />,
      content: (
        <Methodology
          methodology="LEAN"
          definition="A principles-based approach focused on maximizing value and eliminating waste — build only what’s needed, validate quickly, improve continuously."
          context="We are going with this methodology as the project requires a quick turnaround to meet funding. Additionally, our team is compact so focus is a priority."
        />
      ),
    },
    {
      title: "Timeline",
      icon: <FontAwesome5 name="clock" color="white" size={20} />,
      content: (
        <Timeline
          pointsEarned={830}
          totalPoints={4000}
          stage={1}
          stageDescription="Planning content and solidifying technology stack."
          icon={<FontAwesome name="arrow-circle-down" size={24} color="#fff" />}
          date={new Date("2025-09-21T15:30:00")}
        />
      ),
    },
    {
      title: "Members",
      icon: <FontAwesome5 name="users" color="white" size={20} />,
      content: (
        <View className="h-36">
          <ScrollView>
            <Members name={"Eve Nordinstorm"} role={"Project Manager"} />
          </ScrollView>
        </View>
      ),
    },
    {
      title: "Tasks",
      icon: <FontAwesome5 name="list" color="white" size={20} />,
      content: (
        <View className="h-48">
          <ScrollView>
            <TaskCards />
          </ScrollView>
        </View>
      ),
    },
    {
      title: "Points to earn!",
      icon: <FontAwesome name="star" color="yellow" size={24} />,
      content: <PointsToEarn totalPoints={4000} />,
    },
  ];

  const renderHeader = (section: Section, _: number, isActive: boolean) => {
    return (
      <View className="flex-row justify-between items-center bg-darkBlue border border-white px-4 py-6">
        <View className="flex-row items-center gap-4">
          <View>{section.icon}</View>
          <Text className="text-xl font-montserrat-bold text-white">
            {section.title}
          </Text>
        </View>

        <Feather
          name={isActive ? "chevron-up" : "chevron-down"}
          size={24}
          color="white"
        />
      </View>
    );
  };

  const renderContent = (section: Section) => {
    return (
      <View className="bg-darkPurple px-4 py-6">
        <Text className="text-base text-white font-montserrat-semibold">
          {section.content}
        </Text>
      </View>
    );
  };

  const updateSections = (active: number[]) => {
    LayoutAnimation.easeInEaseOut();
    setActiveSections(active);
  };

  return (
    <View className="mx-2 mt-6">
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        underlayColor="transparent"
      />
    </View>
  );
}
