import React, { useState } from "react";
import { View, Text, Modal, ScrollView, Pressable, Alert } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { CustomButton } from "../../CustomButton";
import { ProjectStage } from "common/src/types/interfaces/projectStage";
import { StageIcon } from "common/src/types/enums/stageIcon";
import { useAppDispatch } from "common/src/hooks/hooks";
import { completeStage } from "common/src/redux/slices/projectSlice";

type TimelineProps = {
  projectId: string;
  stages: ProjectStage[];
};

const getIconComponent = (
  icon: StageIcon,
  size: number = 24,
  color: string = "#fff"
) => {
  switch (icon) {
    case StageIcon.ARROW_DOWN:
      return <Feather name="arrow-down" size={size} color={color} />;
    case StageIcon.REFRESH_CW:
      return <Feather name="refresh-cw" size={size} color={color} />;
    case StageIcon.FLAG:
      return <Feather name="flag" size={size} color={color} />;
    default:
      return <Feather name="arrow-down" size={size} color={color} />;
  }
};

export function Timeline({ projectId, stages }: TimelineProps) {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const totalPointsEarned = stages.reduce((sum, s) => sum + s.pointsEarned, 0);
  const totalPointsAvailable = stages.reduce((sum, s) => sum + s.totalPoints, 0);

  const currentStage =
    stages.find((s) => !s.completed) || stages[stages.length - 1];

  const handleCompleteStage = async (stageId: string) => {
    const stage = stages.find((s) => s.id === stageId);
    if (!stage) return;

    const isBeforeDeadline = new Date() <= new Date(stage.date);
    const message = isBeforeDeadline
      ? `Complete this stage? ${stage.totalPoints} points will be awarded to all team members!`
      : `Complete this stage? The deadline has passed, so no points will be awarded.`;

    Alert.alert("Complete Stage", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Complete",
        onPress: async () => {
          try {
            await dispatch(completeStage({ stageId, projectId })).unwrap();
          } catch (err: any) {
            Alert.alert("Error", err || "Failed to complete stage");
          }
        },
      },
    ]);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (stages.length === 0) {
    return (
      <View className="bg-darkBlue w-full p-5">
        <Text className="text-white font-montserrat-semibold text-center">
          No timeline stages defined for this project.
        </Text>
        <Text className="text-gray-400 font-montserrat text-center mt-2">
          Add stages when creating a project to track milestones and earn
          points!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View className="bg-darkBlue w-full">
        <View className="bg-primaryPurple py-3 px-5">
          <Text className="font-montserrat-bold text-white text-xl">
            Stage {currentStage?.stageNumber || 1}
          </Text>
        </View>
        <Text className="text-white font-montserrat-semibold p-5">
          {currentStage?.description || "No description"}
        </Text>
        <View className="flex-row justify-end mb-4 mr-4">
          <CustomButton
            text="Open full timeline"
            bgColor="bg-primaryPurple"
            textSize="text-lg"
            onPress={openModal}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-darkPurple rounded-t-lg h-[80%] w-[95%] mx-auto p-8">
            <ScrollView>
              <Text className="font-montserrat-bold text-2xl text-center text-white mb-4">
                Project Timeline
              </Text>

              <View className="mx-auto mb-5">
                <View className="flex-row items-center px-4 py-1 rounded-full bg-primaryBlue self-start">
                  <FontAwesome name="star" size={22} color="#F8E23B" />
                  <Text className="text-yellow font-montserrat-bold text-lg ml-2">
                    {totalPointsEarned}/{totalPointsAvailable}
                  </Text>
                </View>
              </View>

              {stages.map((stage, index) => (
                <View key={stage.id} className="flex-row gap-3 mb-4">
                  <View className="flex items-center">
                    <View
                      className={`p-2 rounded-full ${
                        stage.completed ? "bg-green-500" : "bg-primaryBlue"
                      }`}
                    >
                      {getIconComponent(stage.icon)}
                    </View>
                    {index < stages.length - 1 && (
                      <View
                        className={`w-[2px] h-10 ${
                          stage.completed ? "bg-green-500" : "bg-white"
                        }`}
                      />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="font-montserrat-bold text-white">
                      Stage {stage.stageNumber}: {stage.description}
                    </Text>
                    <Text className="text-gray-400 font-montserrat text-sm">
                      Deadline: {new Date(stage.date).toLocaleDateString()}
                    </Text>
                    <Text className="text-yellow font-montserrat-semibold">
                      {stage.completed
                        ? `${stage.pointsEarned} pts earned`
                        : `${stage.totalPoints} pts available`}
                    </Text>

                    {!stage.completed && (
                      <Pressable
                        onPress={() => handleCompleteStage(stage.id)}
                        className="bg-green-600 mt-2 px-4 py-2 rounded-full self-start"
                      >
                        <Text className="text-white font-montserrat-semibold">
                          Mark Complete
                        </Text>
                      </Pressable>
                    )}

                    {stage.completed && (
                      <View className="flex-row items-center mt-1">
                        <FontAwesome
                          name="check-circle"
                          size={16}
                          color="#22c55e"
                        />
                        <Text className="text-green-500 font-montserrat ml-1">
                          Completed{" "}
                          {stage.completedAt
                            ? new Date(stage.completedAt).toLocaleDateString()
                            : ""}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>

            <Pressable
              onPress={closeModal}
              className="bg-primaryPurple mt-4 rounded"
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="times-circle" size={24} color="#fff" />
                <Text className="font-montserrat-semibold text-white text-xl px-3 py-5">
                  Close
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
