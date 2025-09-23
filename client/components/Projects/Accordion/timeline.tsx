import React, { useState } from "react";
import { View, Text, Modal, ScrollView, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../../CustomButton";

type TimelineProps = {
  pointsEarned: number;
  totalPoints: number;
  stage: number;
  stageDescription: string;
  icon: React.ReactNode;
  date: Date;
};

export function Timeline({
  pointsEarned,
  totalPoints,
  stage,
  stageDescription,
  icon,
  date,
}: TimelineProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View className="bg-darkBlue w-full">
        <View className="bg-primaryPurple py-3 px-5">
          <Text className="font-montserrat-bold text-white text-xl">
            Stage {stage}
          </Text>
        </View>
        <Text className="text-white font-montserrat-semibold p-5">
          {stageDescription}
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
                    {pointsEarned}/{totalPoints}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex items-center">
                  <View>{icon}</View>
                  <View className="w-[2px] h-5 bg-white"></View>
                </View>

                <Text className="font-montserrat-semibold text-white">
                  {stageDescription}
                </Text>
              </View>
            </ScrollView>

            <Text className="text-white font-montserrat-semibold text-right">
              {date.toLocaleString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </Text>

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
