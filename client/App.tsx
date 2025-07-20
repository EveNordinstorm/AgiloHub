import { useFonts } from "expo-font";
import { Text as RNText, TextProps, TextStyle, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

const defaultFont = "MontserratAlternates-Regular";

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

const DashboardScreen = () => (
  <View>
    <Text>Dashboard</Text>
  </View>
);

const ProjectsScreen = () => (
  <View>
    <Text>Projects</Text>
  </View>
);

const TasksScreen = () => (
  <View>
    <Text>Tasks</Text>
  </View>
);

const ChatsScreen = () => (
  <View>
    <Text>Chats</Text>
  </View>
);

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

            // Assign icon names based on the route
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
          tabBarLabelStyle: {
            fontFamily: "MontserratAlternates-SemiBold",
          },
          headerTitleStyle: {
            fontFamily: "MontserratAlternates-Bold",
          },
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
