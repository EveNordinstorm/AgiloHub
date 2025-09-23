import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import { fetchMethodologies } from "common/src/redux/slices/methodologySlice";
import { View, Text, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any>;

export default function AgileGuideScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.methodology
  );

  useEffect(() => {
    if (!loading && items.length === 0) {
      dispatch(fetchMethodologies());
    }
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#fff" />;
  if (error) return <Text style={{ color: "red" }}>{error}</Text>;

  return (
    <View className="w-full h-full bg-darkBlue py-14 px-5">
      <View className="flex-row items-center mb-10">
        <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
        <Text
          onPress={() => navigation.goBack()}
          className="font-montserrat-semibold text-white text-xl px-3 py-5"
        >
          Go Back
        </Text>
      </View>

      <Text className="text-3xl text-center mb-6 text-white font-montserrat-bold">
        Agile Guide
      </Text>

      <View>
        {items.map((m) => (
          <View key={m.id} className="mb-4 bg-darkPurple p-4">
            <Text className="font-montserrat-bold text-xl text-white bg-primaryPurple self-start px-4 py-1 rounded-full mb-2">
              {m.name}
            </Text>
            <Text className="text-gray-300 font-montserrat">
              {m.definition}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
