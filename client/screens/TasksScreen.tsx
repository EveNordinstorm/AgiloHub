import { ScrollView, View, Text, Pressable } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any>;

export default function TasksScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-row justify-center">
        <Text className="font-montserrat-bold text-white text-3xl mb-3">
          Tasks
        </Text>
      </View>

      <View className="mx-10 mb-7">
        <CustomButton
          text="Create New Task"
          bgColor="bg-yellow"
          textColor="text-black"
          onPress={() => navigation.navigate("Tasks")}
        />
      </View>

      <View className="bg-primaryPurple h-full rounded-t-full mx-8 pt-5 pb-10">
        <View className="w-full px-6">
          <Text className="font-montserrat-semibold text-white text-center text-lg mb-2">
            Complete all{"\n"}tasks to earn:
          </Text>

          <View className="flex-row justify-center mb-4">
            <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue">
              <FontAwesome name="star" size={22} color="#F8E23B" />
              <Text className="text-yellow font-montserrat-bold text-lg ml-2">
                520
              </Text>
            </View>
          </View>

          <Text className="font-montserrat-bold text-2xl text-white text-center mt-2">
            My Tasks
          </Text>
          <Text className="font-montserrat-semibold text-white text-center text-lg mb-2">
            Filter by:
          </Text>

          <View className="flex-row mt-2 w-full">
            <Pressable className="flex-1 items-center justify-center bg-darkBlue py-2">
              <Text className="font-montserrat-bold text-xl text-white">
                Projects
              </Text>
            </Pressable>

            <Pressable className="flex-1 items-center justify-center bg-white py-2">
              <Text className="font-montserrat-bold text-xl text-darkBlue">
                Tasks
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
