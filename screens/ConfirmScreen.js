import React from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ConfirmScreen({
  visible,
  userInfo,
  onEdit,
  onConfirm,
}) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
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
              <Button title="Go back" onPress={onEdit} color="red" />
              <Button title="Continue" onPress={onConfirm} color="blue" />
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
    backgroundColor: "#d3d3d3",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
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
    color: "purple",
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "purple",
    marginBottom: 10,
    textAlign: "center",
  },
  userInfoText: {
    fontSize: 16,
    color: "blue",
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