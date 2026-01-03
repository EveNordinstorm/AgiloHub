import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FormInput } from "../components/FormInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectSchema,
  ProjectFormValues,
} from "common/src/validation/project";
import { createProject } from "common/src/redux/slices/projectSlice";
import { useAppDispatch } from "common/src/hooks/hooks";
import ProjectCards from "../components/Projects/projectCards";
import { CustomButton } from "../components/CustomButton";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useAppSelector } from "common/src/hooks/hooks";
import { fetchMethodologies } from "common/src/redux/slices/methodologySlice";
import { StageInput } from "../components/Projects/StageInput";
import { StageIcon } from "common/src/types/enums/stageIcon";

export default function ProjectsScreen() {
  const dispatch = useAppDispatch();
  const { items: methodologies } = useAppSelector((state) => state.methodology);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    // @ts-expect-error Zod 4 + RHF v7 type mismatch
    resolver: zodResolver(ProjectSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      methodology: methodologies[0]?.id || "",
      context: "",
      members: "",
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [methodology, setMethodology] = useState(methodologies[0]?.id || "");
  const [stages, setStages] = useState<
    Array<{
      description: string;
      points: string;
      date: Date;
      icon: StageIcon;
    }>
  >([]);

  const addStage = () => {
    setStages([
      ...stages,
      {
        description: "",
        points: "",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        icon: StageIcon.ARROW_DOWN,
      },
    ]);
  };

  const removeStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  const updateStage = (
    index: number,
    field: keyof (typeof stages)[0],
    value: any
  ) => {
    const updated = [...stages];
    updated[index] = { ...updated[index], [field]: value };
    setStages(updated);
  };

  useEffect(() => {
    if (methodologies.length === 0) {
      dispatch(fetchMethodologies());
    }
  }, [dispatch, methodologies.length]);

  useEffect(() => {
    if (methodologies.length > 0 && !methodology) {
      setMethodology(methodologies[0].id);
      setValue("methodology", methodologies[0].id);
    }
  }, [methodologies]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: ProjectFormValues) => {
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        techStack: data.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        members: data.members
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean),
        methodologyId: methodology,
        stages: stages
          .filter((s) => s.description && s.points)
          .map((s) => ({
            description: s.description,
            totalPoints: parseInt(s.points, 10) || 0,
            date: s.date.toISOString(),
            icon: s.icon,
          })),
      };

      const result = await dispatch(createProject(payload)).unwrap();

      if (result && result.id) {
        reset();
        setMethodology(methodologies[0]?.id || "");
        setStages([]);
        closeModal();
      } else {
        setSubmitError("Project creation failed. Please try again.");
      }
    } catch (err: any) {
      setSubmitError(err?.message || "Project creation failed.");
    }
  };

  return (
    <View>
      <View className="mx-5 mb-[220px]">
        <View className="flex-row justify-center">
          <Text className="font-montserrat-bold text-white text-3xl mb-3">
            Projects
          </Text>
        </View>
        <View className="mx-5 mb-7">
          <CustomButton
            text="Create New Project"
            bgColor="bg-yellow"
            textColor="text-black"
            onPress={openModal}
          />
        </View>

        <ScrollView>
          <ProjectCards />
        </ScrollView>
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
                  Create Project
                </Text>
                {/* Title */}
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Title"
                      placeholder="Project title"
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
                      placeholder="Describe your project"
                      value={value}
                      onChangeText={onChange}
                      error={errors.description?.message}
                      multiline
                    />
                  )}
                />
                {/* Tech Stack */}
                <Controller
                  control={control}
                  name="techStack"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Tech Stack"
                      placeholder="e.g. React, TypeScript, Node.js"
                      value={value}
                      onChangeText={onChange}
                      error={errors.techStack?.message}
                    />
                  )}
                />
                {/* Methodology */}
                <Text className="text-white text-lg ml-4 font-montserrat-semibold mb-2">
                  Methodology
                </Text>
                <View className="bg-primaryBlue rounded-3xl px-2 py-2 mb-4">
                  {methodologies.map((m) => (
                    <Pressable
                      key={m.id}
                      onPress={() => {
                        setMethodology(m.id);
                        setValue("methodology", m.id);
                      }}
                      className={`py-2 ${methodology === m.id ? "bg-yellow rounded-full" : ""}`}
                    >
                      <Text
                        className={`text-lg text-center ${
                          methodology === m.id
                            ? "text-black font-montserrat-bold"
                            : "text-white font-montserrat"
                        }`}
                      >
                        {m.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {/* Context */}
                <Controller
                  control={control}
                  name="context"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Methodology Context"
                      placeholder="Why this agile method?"
                      value={value}
                      onChangeText={onChange}
                      error={errors.context?.message}
                      multiline
                    />
                  )}
                />
                {/* Members */}
                <Controller
                  control={control}
                  name="members"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Invite Members via email"
                      placeholder="e.g. user1@email.com, user2@email.com"
                      value={value}
                      onChangeText={onChange}
                      error={errors.members?.message}
                      multiline
                    />
                  )}
                />

                {/* Timeline Stages */}
                <View>
                  <View className="mb-3">
                    <Text className="text-white font-montserrat-bold text-lg ml-4 mb-2">
                      Timeline Stages (Optional)
                    </Text>
                    <Pressable
                      onPress={addStage}
                      className="bg-primaryBlue px-3 py-2 rounded-full flex-row items-center"
                    >
                      <Feather name="plus" size={24} color="#fff" />
                      <Text className="text-white font-montserrat-bold text-lg ml-1">
                        Add Stage
                      </Text>
                    </Pressable>
                  </View>

                  {stages.map((stage, index) => (
                    <StageInput
                      key={index}
                      stageNumber={index + 1}
                      description={stage.description}
                      onDescriptionChange={(text) =>
                        updateStage(index, "description", text)
                      }
                      points={stage.points}
                      onPointsChange={(text) =>
                        updateStage(index, "points", text)
                      }
                      date={stage.date}
                      onDateChange={(date) => updateStage(index, "date", date)}
                      icon={stage.icon}
                      onIconChange={(icon) => updateStage(index, "icon", icon)}
                      onRemove={() => removeStage(index)}
                    />
                  ))}

                  {stages.length === 0 && (
                    <Text className="text-yellow font-montserrat-semibold text-center py-4">
                      Add stages to track your project milestones and earn
                      points!
                    </Text>
                  )}
                </View>
              </ScrollView>

              <Pressable
                onPress={handleSubmit(onSubmit)}
                className="bg-green-600 mt-4 rounded"
              >
                <View className="flex-row items-center justify-center">
                  <FontAwesome name="check-circle" size={24} color="#fff" />
                  <Text className="font-montserrat-semibold text-white text-xl px-3 py-5">
                    Create Project
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
