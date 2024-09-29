import React from "react";
import { View, Text, Modal, StyleSheet, SafeAreaView } from "react-native";
import CustomButton from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import colours from "../helper/Colour";

export default function ConfirmScreen({
  visible = true,
  userInfo,
  onEdit,
  onGameStart,
}) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <LinearGradient
        colors={colours.gradient}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.greetingText}>Hello {userInfo.name}</Text>
            
            <Text style={styles.instructionText}>
              Here is the information you entered:
            </Text>

            <Text style={styles.userInfoText}>{userInfo.email}</Text>
            <Text style={styles.userInfoText}>{userInfo.phone}</Text>

            <Text style={styles.instructionText}>
              If it is not correct, please go back and edit them.
            </Text>

            <View style={styles.buttonsRow}>
              <CustomButton title="Go back" onPress={onEdit} color={colours.buttonRed} />
              <CustomButton
                title="Continue"
                onPress={() => {
                  if (typeof onGameStart === 'function') {
                    onGameStart();
                  }
                }}
                color={colours.buttonBlue}
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    backgroundColor: colours.cardBackground,
    padding: 20,
    borderRadius: 10,
    shadowColor: colours.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colours.greetingText,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: colours.instructionText, 
    marginBottom: 10,
    textAlign: "center",
  },
  userInfoText: {
    fontSize: 16,
    color: colours.userInfoText,
    marginBottom: 5,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
});
