import "./global.css";
import { useFonts } from "expo-font";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import PointsDisplay from "./components/PointsDisplay";
import SettingsButton from "./components/SettingsButton";
import DashboardScreen from "./screens/DashboardScreen";
import ProjectsScreen from "./screens/ProjectScreen";
import TasksScreen from "./screens/TasksScreen";
import ChatsScreen from "./screens/ChatsScreen";

const defaultFont = "MontserratAlternates-Regular";

const HEADER_BG = "#171623";
const TAB_BG = "#0047AB";
const TAB_ACTIVE = "#F8E23B";
const TAB_INACTIVE = "#FFFFFF";

const Text = (props: TextProps) => {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: defaultFont }, props.style as TextStyle]}
    />
  );
};

Object.assign(Text, RNText);
// @ts-ignore
global.Text = Text;

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "MontserratAlternates-Regular": require("./assets/fonts/MontserratAlternates-Regular.ttf"),
    "MontserratAlternates-Bold": require("./assets/fonts/MontserratAlternates-Bold.ttf"),
    "MontserratAlternates-SemiBold": require("./assets/fonts/MontserratAlternates-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName:
              | "dashboard"
              | "clipboard"
              | "list-ul"
              | "comments"
              | undefined;

            if (route.name === "Dashboard") {
              iconName = "dashboard";
            } else if (route.name === "Projects") {
              iconName = "clipboard";
            } else if (route.name === "Tasks") {
              iconName = "list-ul";
            } else if (route.name === "Chats") {
              iconName = "comments";
            }

            return iconName ? (
              <FontAwesome name={iconName} size={24} color={color} />
            ) : null;
          },
          tabBarStyle: {
            backgroundColor: TAB_BG,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: TAB_ACTIVE,
          tabBarInactiveTintColor: TAB_INACTIVE,
          tabBarLabelStyle: {
            fontFamily: "MontserratAlternates-SemiBold",
          },

          headerStyle: {
            backgroundColor: HEADER_BG,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            fontFamily: "MontserratAlternates-Bold",
            color: "#fff",
          },
          headerLeft: () => <PointsDisplay />,
          headerRight: () => <SettingsButton />,
          headerTitle: "",
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Projects" component={ProjectsScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Chats" component={ChatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
