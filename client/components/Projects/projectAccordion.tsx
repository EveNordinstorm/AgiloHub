import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";

// Enable LayoutAnimation on Android
// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

type Section = {
  title: string;
  icon?: React.ReactNode;
  content: string;
};

const SECTIONS: Section[] = [
  {
    title: "Technology Stack",
    icon: <FontAwesome5 name="clone" color="white" size={20} />,
    content: "Section to go here.",
  },
  {
    title: "Methodology",
    icon: <FontAwesome5 name="chess-board" color="white" size={20} />,
    content: "Section to go here.",
  },
  {
    title: "Timeline",
    icon: <FontAwesome5 name="clock" color="white" size={20} />,
    content: "Section to go here.",
  },
  {
    title: "Members",
    icon: <FontAwesome5 name="users" color="white" size={20} />,
    content: "Section to go here.",
  },
  {
    title: "Tasks",
    icon: <FontAwesome5 name="list" color="white" size={20} />,
    content: "Section to go here.",
  },
  {
    title: "Points to earn!",
    icon: <FontAwesome name="star" color="yellow" size={24} />,
    content: "Section to go here.",
  },
];

export default function ProjectAccordion() {
  const [activeSections, setActiveSections] = useState<number[]>([]);

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
