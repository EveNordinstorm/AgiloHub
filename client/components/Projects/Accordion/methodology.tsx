import { View, Text } from "react-native";

type MethodologyProps = {
  methodology: string;
  definition: string;
  context: string;
};

export function Methodology({
  methodology,
  definition,
  context,
}: MethodologyProps) {
  return (
    <View className="flex gap-4">
      <View className="bg-darkBlue p-5">
        <View className="bg-yellow py-1 px-3 mr-auto">
          <Text className="font-montserrat-bold text-black text-lg">
            {methodology}
          </Text>
        </View>
        <Text className="text-white font-montserrat-semibold text-sm mt-3">
          {definition}
        </Text>
      </View>

      <View className="p-2">
        <Text className="text-white font-montserrat-bold text-xl mb-2">
          Project Context:
        </Text>
        <Text className="text-white font-montserrat-semibold text-base">
          {context}
        </Text>
      </View>
    </View>
  );
}
