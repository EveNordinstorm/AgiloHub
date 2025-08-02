import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../components/CustomButton";

type Props = NativeStackScreenProps<any>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <View className="w-full h-full bg-primaryBlue py-14 px-5">
      <View className="flex-row items-center mb-10">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Return to Login
        </Text>
      </View>

      <Text className="text-3xl text-center mb-6 text-white font-montserrat-bold">
        Register
      </Text>

      <CustomButton
        text="Next"
        onPress={() => navigation.replace("MainTabs")}
        bgColor="bg-yellow"
        textColor="text-black"
      />
    </View>
  );
}
