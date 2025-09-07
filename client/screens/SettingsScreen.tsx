import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../components/CustomButton";
import { useAppDispatch } from "common/src/hooks/hooks";
import { logout } from "common/src/redux/slices/authSlice";

type Props = NativeStackScreenProps<any>;

export default function SettingsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Welcome");
  };

  return (
    <View className="w-full h-full bg-darkBlue py-14 px-5">
      <View className="flex-row items-center mb-10">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Exit Settings
        </Text>
      </View>

      <Text className="text-3xl text-center mb-6 text-white font-montserrat-bold">
        My Settings
      </Text>

      <CustomButton
        text="Logout"
        onPress={handleLogout}
        bgColor="bg-yellow"
        textColor="text-black"
      />
    </View>
  );
}
