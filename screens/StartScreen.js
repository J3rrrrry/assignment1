import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Checkbox from "../components/Checkbox";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmScreen from "./ConfirmScreen";

export default function StartScreen({ onGameStart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  function validateName(input) {
    if (input.trim().length <= 1 || /\d/.test(input)) {
      setNameError("Please enter a valid name");
    } else {
      setNameError(null);
    }
  }

  function handleRegister() {
    if (!nameError && !emailError && !phoneError && isCheckboxChecked) {
      setShowConfirmScreen(true);
    } else {
      Alert.alert("Error", "Please fix validation errors and check the box.");
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setIsCheckboxChecked(false);
    setNameError(null);
    setEmailError(null);
    setPhoneError(null);
  }

  function handleEdit() {
    setShowConfirmScreen(false);
  }

  function handleConfirm() {
    setShowConfirmScreen(false);
    onGameStart();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text);
          }}
          placeholder="Enter your name"
        />
        {nameError && <ErrorMessage message={nameError} />}

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        {emailError && <ErrorMessage message={emailError} />}

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Enter your phone"
          keyboardType="numeric"
        />
        {phoneError && <ErrorMessage message={phoneError} />}

        <Checkbox
          label="I am not a robot"
          isChecked={isCheckboxChecked}
          onCheck={() => setIsCheckboxChecked(!isCheckboxChecked)}
        />

        <View style={styles.buttonsRow}>
          <Button title="Reset" onPress={resetForm} color="red" />
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={!isCheckboxChecked}
            color="blue"
          />
        </View>
      </View>

      {/* ConfirmScreen*/}
      <ConfirmScreen
        visible={showConfirmScreen}
        userInfo={{ name, email, phone }}
        onEdit={handleEdit}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#add8e6",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "darkblue",
    marginBottom: 20,
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
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "purple",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "purple",
    padding: 10,
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
