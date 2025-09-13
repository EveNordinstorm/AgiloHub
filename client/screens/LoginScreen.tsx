import { useState } from "react";
import { setRefreshToken } from "../secureStore";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "common/src/hooks/hooks";
import { loginUser } from "common/src/redux/slices/authSlice";
import { LoginSchema, LoginFormValues } from "common/src/validation/auth";
import { FormInput } from "../components/FormInput";
import { CustomButton } from "../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    // @ts-expect-error Zod 4 + RHF v7 type mismatch
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);

      const result = await dispatch(loginUser(data)).unwrap();

      if (result.refreshToken) {
        await setRefreshToken(result.refreshToken);
      }

      navigation.replace("MainTabs");
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : (err as { message?: string; error?: string })?.message ||
            (err as { error?: string })?.error ||
            "Login failed";
      setServerError(message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#171623" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ paddingVertical: 56, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-primaryBlue"
      >
        <View className="flex-row items-center mb-10">
          <FontAwesome name="arrow-circle-left" size={24} color="#fff" />
          <Text
            onPress={() => navigation.goBack()}
            className="font-montserrat-semibold text-white text-xl px-3 py-5"
          >
            Return to Register
          </Text>
        </View>

        <Text className="text-3xl text-center mb-6 text-white font-montserrat-bold">
          Login
        </Text>

        {serverError && (
          <Text className="bg-red-600 text-white font-semibold text-lg text-center rounded py-1 mb-4">
            {serverError}!
          </Text>
        )}

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email"
              placeholder="Enter your email"
              autoCapitalize="none"
              value={value}
              onChangeText={(text) => onChange(text.toLowerCase())}
              error={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Password"
              placeholder="Enter your password"
              secure
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        <View className="mt-6">
          <CustomButton
            text="Login"
            onPress={handleSubmit(onSubmit)}
            bgColor="bg-yellow"
            textColor="text-black"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
