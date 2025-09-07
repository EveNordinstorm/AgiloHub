import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterFormValues } from "common/src/validation/auth";
import { useAppDispatch } from "common/src/hooks/hooks";
import { registerUser } from "common/src/redux/slices/authSlice";
import { FormInput } from "../components/FormInput";
import { CustomButton } from "../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    // @ts-expect-error Zod 4 + RHF v7 type mismatch
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigation.replace("MainTabs");
    } catch (err) {
      console.error("Registration failed", err);
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
            Return to Login
          </Text>
        </View>

        <Text className="text-3xl text-center mb-6 text-white font-montserrat-bold">
          Register
        </Text>

        {/* First Name */}
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="First Name"
              placeholder="Forename"
              value={value}
              onChangeText={onChange}
              error={errors.firstName?.message}
            />
          )}
        />

        {/* Last Name */}
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Last Name"
              placeholder="Surname"
              value={value}
              onChangeText={onChange}
              error={errors.lastName?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email Address"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
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
              placeholder="Password"
              secure
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Confirm Password"
              placeholder="Confirm Password"
              secure
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <View className="mt-6">
          <CustomButton
            text="Register"
            onPress={handleSubmit(onSubmit)}
            bgColor="bg-yellow"
            textColor="text-black"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
