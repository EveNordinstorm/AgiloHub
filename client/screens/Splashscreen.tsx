import { View, Image, ImageBackground } from "react-native";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AgiloHubLogo } from "../components/AgiloHubLogo";

type Props = NativeStackScreenProps<any>;

const splashBg = require("../assets/stars-bg.jpg");

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground source={splashBg} className="flex-1 w-full h-full">
      <View className="flex-1 justify-center items-center mx-14">
        <AgiloHubLogo fill="#fff" />
      </View>
    </ImageBackground>
  );
}
