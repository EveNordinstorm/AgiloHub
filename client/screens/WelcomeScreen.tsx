import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AgiloHubLogo } from "../components/AgiloHubLogo";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "../components/CustomButton";

type Props = NativeStackScreenProps<any>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={["#726DB3", "#0047AB", "#171623"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex justify-center h-full w-full px-10"
    >
      <View className="h-20 mb-5">
        <AgiloHubLogo fill="#fff" />
      </View>

      <Text className="text-2xl font-montserrat-semibold text-center text-white mb-20">
        The No.1 hub{"\n"}for agile teams
      </Text>

      <View className="gap-5">
        <CustomButton
          text="Login"
          onPress={() => navigation.navigate("Login")}
          bgColor="bg-yellow"
          textColor="text-black"
        />
        <CustomButton
          text="Create Account"
          onPress={() => navigation.navigate("Register")}
          bgColor="bg-darkBlue"
        />
      </View>
    </LinearGradient>
  );
}
