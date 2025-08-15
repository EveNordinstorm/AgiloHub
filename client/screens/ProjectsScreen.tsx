import { ScrollView, View, Text } from "react-native";
import ProjectCards from "../components/Projects/projectCards";
import { CustomButton } from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <View className="mx-5 mb-[110px]">
      <View className="flex-row justify-center">
        <Text className="font-montserrat-bold text-white text-3xl mb-3">
          Projects
        </Text>
      </View>
      <View className="mx-10 mb-7">
        <CustomButton
          text="Create New Project"
          bgColor="bg-yellow"
          textColor="text-black"
          onPress={() => navigation.navigate("Projects")}
        />
      </View>

      <ScrollView>
        <ProjectCards />
      </ScrollView>
    </View>
  );
}
