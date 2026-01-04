import { deleteRefreshToken } from "../secureStore";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../components/CustomButton";
import { useAppDispatch } from "common/src/hooks/hooks";
import { logout } from "common/src/redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<any>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen({ navigation }: Props) {
  const navigationButton = useNavigation<NavigationProp>();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Welcome");
    deleteRefreshToken();
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

      <View className="gap-5">
        <CustomButton
          text="Task History"
          onPress={() => navigationButton.navigate("TaskHistory")}
          bgColor="bg-primaryPurple"
          textColor="text-white"
        />

        <CustomButton
          text="Logout"
          onPress={handleLogout}
          bgColor="bg-yellow"
          textColor="text-black"
        />
      </View>
    </View>
  );
}
