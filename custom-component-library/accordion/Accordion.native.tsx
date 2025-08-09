import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggle, AccordionItem } from "./AccordionSlice";

interface Props {
  items: AccordionItem[];
}

export default function AccordionNative({ items }: Props) {
  const dispatch = useAppDispatch();
  const openIndex = useAppSelector((state) => state.accordion.openIndex);

  return (
    <View className="border rounded-lg">
      {items.map((item, i) => (
        <View key={i}>
          <TouchableOpacity
            onPress={() => dispatch(toggle(i))}
            className="w-full p-4 bg-gray-200"
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
          {openIndex === i && (
            <View className="p-4 bg-white">
              <Text>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
