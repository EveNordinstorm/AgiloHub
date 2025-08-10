import React, { useState } from "react";
import { View, Text, Modal, ScrollView, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../../CustomButton";

type TimelineProps = {
  stage: number;
  stageDescription: string;
  icon: React.ReactNode;
  date?: string; // TODO - Implement date tracking
};

export function Timeline({ stage, stageDescription, date }: TimelineProps) {
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
          <View className="bg-darkPurple rounded-t-lg min-h-[80%] w-[95%] mx-auto p-8">
            <ScrollView>
              <Text className="font-montserrat-bold text-2xl text-center text-white mb-4">
                Project Timeline
              </Text>
              <Text className="font-montserrat-semibold text-white">
                {stageDescription}
              </Text>
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
