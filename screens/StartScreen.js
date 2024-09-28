import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import Checkbox from "../components/Checkbox";
import ErrorMessage from "../components/ErrorMessage";

export default function StartScreen({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  function validateName(input) {
    if (input.trim().length <= 1 || /\d/.test(input)) {
      setNameError("Invalid name: Should be non-numeric and longer than 1 character.");
    } else {
      setNameError(null);
    }
  }

  function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError(null);
    }
  }

  function validatePhone(input) {
    const phonePattern = /^\d{9}[2-9]$/; // 10 digits, last one not 0 or 1
    if (!phonePattern.test(input)) {
      setPhoneError("Phone must be 10 digits, last digit cannot be 0 or 1.");
    } else {
      setPhoneError(null);
    }
  }

  function handleRegister() {
    if (!nameError && !emailError && !phoneError && isCheckboxChecked) {
      onRegister();
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

  return (
    <View style={styles.container}>
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

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        {emailError && <ErrorMessage message={emailError} />}

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            validatePhone(text);
          }}
          placeholder="Enter your phone"
          keyboardType="numeric"
        />
        {phoneError && <ErrorMessage message={phoneError} />}

        <Checkbox
          label="I agree to the terms and conditions"
          isChecked={isCheckboxChecked}
          onCheck={() => setIsCheckboxChecked((prev) => !prev)}
        />

        <View style={styles.buttonsRow}>
          <Button title="Reset" onPress={resetForm} />
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={!isCheckboxChecked}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
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
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});