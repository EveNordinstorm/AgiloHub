import { useEffect } from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import { fetchPointsTotal } from "common/src/redux/slices/pointsSlice";

export default function PointsDisplay() {
  const dispatch = useAppDispatch();

  const total = useAppSelector((state) => state.points.total);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchPointsTotal());
    }
  }, [user]);

  return (
    <View className="ml-5 flex-row gap-2 bg-primaryBlue px-2 rounded-full py-1 items-center">
      <FontAwesome name="star" size={22} color="#F8E23B" />
      <Text className="text-yellow font-montserrat-bold text-lg">{total}</Text>
    </View>
  );
}
