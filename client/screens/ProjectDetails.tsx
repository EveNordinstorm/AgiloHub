import { ScrollView, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import ProjectAccordion from "../components/Projects/Accordion/projectAccordion";

type Props = NativeStackScreenProps<any>;

export default function ProjectDetailsScreen({ navigation }: Props) {
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
      <ProjectAccordion />
    </ScrollView>
  );
}
