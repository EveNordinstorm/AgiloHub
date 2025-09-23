import { View, Text, Pressable, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "common/src/hooks/hooks";
import { Project } from "common/src/types/interfaces/project";
import { fetchProjects } from "common/src/redux/slices/projectSlice";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProjectDetails"
>;

type CardItemProps = {
  title: string;
  methodology: string;
  techStack: string[];
  onPress: () => void;
};

export function ProjectCardItem({
  title,
  methodology,
  techStack,
  onPress,
}: CardItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 20,
      tension: 150,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 10,
      tension: 100,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View className="bg-darkPurple p-3">
          <View className="bg-primaryBlue p-5">
            <Text className="text-white font-montserrat-bold text-2xl mb-2">
              {title}
            </Text>
            <View className="bg-yellow py-1 px-3 mr-auto">
              <Text className="font-montserrat-bold text-black text-lg">
                {methodology}
              </Text>
            </View>
          </View>
          <View className="px-2 mt-4">
            <View className="flex-row flex-wrap">
              {techStack.map((item, index) => (
                <View key={`${item}-${index}`} className="mr-2 mb-2">
                  <Text className="text-white text-lg font-montserrat-semibold bg-darkBlue rounded-full px-3 py-1">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="flex-row justify-end">
            <Feather name="chevron-right" color="white" size={24} />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function ProjectCards() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const { projects, loading, error } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  if (loading) {
    return (
      <View>
        <Text className="text-white">Loading projects...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-row flex-wrap justify-between">
      {projects.map((proj: Project) => (
        <View key={proj.id} className="w-full mb-5">
          <ProjectCardItem
            title={proj.title}
            methodology={proj.methodology?.name ?? "Unknown"}
            techStack={proj.techStack}
            onPress={() =>
              navigation.navigate("ProjectDetails", { projectId: proj.id })
            }
          />
        </View>
      ))}
    </View>
  );
}
