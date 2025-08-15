import { View, Text, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "../../common/src/validation/auth";

type Props = NativeStackScreenProps<any>;

export default function RegisterScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form data:", data);
    // TODO: Call register endoint
    navigation.replace("MainTabs");
  };

  return (
    <View className="w-full h-full bg-primaryBlue py-14 px-5">
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
          <>
            <TextInput
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              className="bg-white font-montserrat-semibold text-lg py-4 px-6 rounded-full mb-4"
            />
            {errors.firstName && (
              <Text className="text-red-500">{errors.firstName.message}</Text>
            )}
          </>
        )}
      />

      {/* Last Name */}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
              className="bg-white font-montserrat-semibold text-lg py-4 px-6 rounded-full mb-4"
            />
            {errors.lastName && (
              <Text className="text-red-500">{errors.lastName.message}</Text>
            )}
          </>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              className="bg-white font-montserrat-semibold text-lg py-4 px-6 rounded-full mb-4"
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              className="bg-white font-montserrat-semibold text-lg py-4 px-6 rounded-full mb-4"
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </>
        )}
      />

      {/* Submit Button */}
      <View className="mt-6">
        <CustomButton
          text="Register"
          onPress={handleSubmit(onSubmit)}
          bgColor="bg-yellow"
          textColor="text-black"
        />
      </View>
    </View>
  );
}
