import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type FormInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
  secure?: boolean;
} & TextInputProps;

export const FormInput = ({
  label,
  placeholder,
  error,
  secure = false,
  ...rest
}: FormInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-white text-lg font-montserrat-semibold mb-1 ml-4">
        {label}
      </Text>
      <View
        className={`flex-row items-center bg-white rounded-full px-4 ${
          secure ? "py-0" : "py-0"
        }`}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#888"
          secureTextEntry={secure && !show}
          className="flex-1 font-montserrat-semibold text-lg py-4"
          {...rest}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setShow((prev) => !prev)}
            className="px-2"
          >
            <FontAwesome
              name={show ? "eye-slash" : "eye"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-red-500 mt-1 ml-4">{error}</Text>}
    </View>
  );
};
