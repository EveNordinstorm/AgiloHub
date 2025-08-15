import { View, Text, FlatList } from "react-native";

type TechStackProps = {
  techStack: string[];
};

export function TechnologyStack({ techStack }: TechStackProps) {
  return (
    <FlatList
      data={techStack}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <View className="flex-row">
          <Text className="text-white text-lg mr-2">•</Text>
          <Text className="text-white text-lg font-montserrat-semibold">
            {item}
          </Text>
        </View>
      )}
      scrollEnabled={false}
    />
  );
}
