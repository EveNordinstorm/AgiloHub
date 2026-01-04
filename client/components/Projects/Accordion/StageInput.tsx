import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { FormInput } from "../../FormInput";
import { Feather } from "@expo/vector-icons";
import { StageIcon } from "common/src/types/enums/stageIcon";
import DateTimePicker from "@react-native-community/datetimepicker";

type StageInputProps = {
  stageNumber: number;
  description: string;
  onDescriptionChange: (text: string) => void;
  points: string;
  onPointsChange: (text: string) => void;
  date: Date;
  onDateChange: (date: Date) => void;
  icon: StageIcon;
  onIconChange: (icon: StageIcon) => void;
  onRemove?: () => void;
  showRemove?: boolean;
  errors?: {
    description?: string;
    points?: string;
    date?: string;
  };
};

const ICONS: { value: StageIcon; name: keyof typeof Feather.glyphMap }[] = [
  { value: StageIcon.ARROW_DOWN, name: "arrow-down" },
  { value: StageIcon.REFRESH_CW, name: "refresh-cw" },
  { value: StageIcon.FLAG, name: "flag" },
];

export function StageInput({
  stageNumber,
  description,
  onDescriptionChange,
  points,
  onPointsChange,
  date,
  onDateChange,
  icon,
  onIconChange,
  onRemove,
  showRemove = true,
  errors,
}: StageInputProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View className="bg-primaryBlue rounded-lg p-4 mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white font-montserrat-bold text-lg">
          Stage {stageNumber}
        </Text>
        {showRemove && onRemove && (
          <Pressable onPress={onRemove}>
            <Feather name="trash-2" size={22} color="#f87171" />
          </Pressable>
        )}
      </View>

      <FormInput
        label="Description"
        placeholder="What happens in this stage?"
        value={description}
        onChangeText={onDescriptionChange}
        error={errors?.description}
      />

      <FormInput
        label="Points"
        placeholder="100"
        value={points}
        onChangeText={onPointsChange}
        keyboardType="numeric"
        error={errors?.points}
      />

      <Text className="text-white font-montserrat-semibold mb-2 ml-4">
        Icon
      </Text>
      <View className="flex-row gap-4 mb-4 ml-4">
        {ICONS.map((ic) => (
          <Pressable
            key={ic.value}
            onPress={() => onIconChange(ic.value)}
            className={`p-3 rounded-full ${
              icon === ic.value ? "bg-yellow" : "bg-darkBlue"
            }`}
          >
            <Feather
              name={ic.name}
              size={24}
              color={icon === ic.value ? "#000" : "#fff"}
            />
          </Pressable>
        ))}
      </View>

      <Text className="text-white font-montserrat-semibold mb-2 ml-4">
        Deadline
      </Text>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="bg-white rounded-full px-4 py-4 ml-4 mr-4 mb-2"
      >
        <Text className="font-montserrat-semibold text-lg text-gray-700">
          {date.toLocaleDateString()}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      {errors?.date && (
        <Text className="text-red-500 mt-1 ml-4">{errors.date}</Text>
      )}
    </View>
  );
}
