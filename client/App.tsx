import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

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
