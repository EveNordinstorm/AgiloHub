import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { FormInput } from "../components/FormInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskFormValues } from "common/src/validation/task";
import { CustomButton } from "../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import TaskCards from "../components/Tasks/taskCards";

export default function TasksScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    // @ts-expect-error Zod 4 + RHF v7 type mismatch
    resolver: zodResolver(TaskSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      points: 0,
      deadline: new Date(),
    },
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: TaskFormValues) => {
    setSubmitError(null);
    try {
      const payload = {
        ...data,
      };

      // const result = await dispatch(createTask(payload)).unwrap();

      // if (result && result.id) {
      //   reset();
      //   closeModal();
      // } else {
      //   setSubmitError("Task creation failed. Please try again.");
      // }
    } catch (err: any) {
      setSubmitError(err?.message || "Task creation failed.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View className="flex-row justify-center">
          <Text className="font-montserrat-bold text-white text-3xl mb-3">
            Tasks
          </Text>
        </View>

        <View className="mx-10 mb-7">
          <CustomButton
            text="Create New Task"
            bgColor="bg-yellow"
            textColor="text-black"
            onPress={openModal}
          />
        </View>

        <View className="bg-primaryPurple h-full rounded-t-full mx-8 pt-8 pb-10">
          <View className="w-full px-6 flex-1">
            <Text className="font-montserrat-semibold text-white text-center text-lg/6 mb-2">
              Complete all{"\n"}tasks to earn:
            </Text>

            <View className="flex-row justify-center mb-4">
              <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue">
                <FontAwesome name="star" size={22} color="#F8E23B" />
                <Text className="text-yellow font-montserrat-bold text-lg ml-2">
                  520
                </Text>
              </View>
            </View>

            <Text className="font-montserrat-bold text-2xl text-white text-center mt-2">
              My Tasks
            </Text>
            <Text className="font-montserrat-semibold text-white text-center text-lg mb-2">
              Filter by:
            </Text>

            <View className="flex-row w-full">
              <Pressable className="flex-1 items-center justify-center bg-darkPurple py-2">
                <Text className="font-montserrat-bold text-xl text-white">
                  Projects
                </Text>
              </Pressable>

              <Pressable className="flex-1 items-center justify-center bg-white py-2">
                <Text className="font-montserrat-bold text-xl text-darkPurple">
                  Personal
                </Text>
              </Pressable>
            </View>

            <ScrollView
              style={{ flex: 1, marginTop: 16 }}
              contentContainerStyle={{ paddingBottom: 80 }}
              showsVerticalScrollIndicator={false}
            >
              <TaskCards />
            </ScrollView>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-black/50 justify-center">
            <View className="bg-darkBlue rounded-lg h-[90%] w-[95%] mx-auto p-8">
              <Pressable onPress={closeModal}>
                <View className="flex-row justify-end">
                  <FontAwesome name="times-circle" size={24} color="#fff" />
                </View>
              </Pressable>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 32 }}
              >
                <Text className="font-montserrat-bold text-white text-2xl mb-6">
                  Create a Task
                </Text>
                {/* Title */}
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Title"
                      placeholder="Task title"
                      value={value}
                      onChangeText={onChange}
                      error={errors.title?.message}
                    />
                  )}
                />
                {/* Description */}
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Description"
                      placeholder="Describe your task"
                      value={value}
                      onChangeText={onChange}
                      error={errors.description?.message}
                      multiline
                    />
                  )}
                />
                {/* Points */}
                <Controller
                  control={control}
                  name="points"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Points Value"
                      placeholder="Reward points"
                      value={value ? String(value) : ""}
                      onChangeText={(text) => {
                        const num = parseInt(text, 10);
                        onChange(isNaN(num) ? undefined : num);
                      }}
                      error={errors.points?.message}
                      keyboardType="numeric"
                    />
                  )}
                />
                {/* Deadline */}
                <Controller
                  control={control}
                  name="deadline"
                  render={({ field: { onChange, value } }) => {
                    const showDateTimePicker = () => {
                      // Pick Date
                      DateTimePickerAndroid.open({
                        value: value instanceof Date ? value : new Date(),
                        mode: "date",
                        is24Hour: true,
                        onChange: (event, selectedDate) => {
                          if (event.type === "set" && selectedDate) {
                            // Pick Time
                            DateTimePickerAndroid.open({
                              value: selectedDate,
                              mode: "time",
                              is24Hour: true,
                              onChange: (timeEvent, selectedTime) => {
                                if (timeEvent.type === "set" && selectedTime) {
                                  // Merge date & time
                                  const merged = new Date(selectedDate);
                                  merged.setHours(selectedTime.getHours());
                                  merged.setMinutes(selectedTime.getMinutes());
                                  onChange(merged);
                                }
                              },
                            });
                          }
                        },
                      });
                    };

                    return (
                      <View>
                        <Text className="text-white text-lg ml-4 font-montserrat-semibold mb-2">
                          Task Deadline
                        </Text>
                        <Pressable
                          onPress={showDateTimePicker}
                          className="bg-primaryBlue rounded-full"
                        >
                          <View className="flex-row items-center justify-center">
                            <Feather name="clock" size={24} color="#fff" />
                            <Text className="font-montserrat-semibold text-white text-lg px-3 py-4">
                              {value instanceof Date
                                ? value.toLocaleString(undefined, {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "Pick a date & time"}
                            </Text>
                          </View>
                        </Pressable>
                        {errors.deadline && (
                          <Text style={{ color: "red" }}>
                            {errors.deadline.message}
                          </Text>
                        )}
                      </View>
                    );
                  }}
                />
              </ScrollView>

              <Pressable
                onPress={handleSubmit(onSubmit)}
                className="bg-green-500 mt-4 rounded"
              >
                <View className="flex-row items-center justify-center">
                  <FontAwesome name="check-circle" size={24} color="#fff" />
                  <Text className="font-montserrat-semibold text-white text-xl px-3 py-5">
                    Create Task
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
