import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import Checkbox from "../components/Checkbox";
import ErrorMessage from "../components/ErrorMessage";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import { LinearGradient } from "expo-linear-gradient";
import colours from "../helper/Colour";

/**
 * StartScreen
 *
 * A screen for user registration that collects the user's name, email, and phone number, 
 * with form validation and an option to reset the form.
 *
 * @param {function} onRegister - Callback for when the user successfully registers.
 * @param {object} [initialValues={}] - Initial values for the form fields (name, email, phone).
 *
 * @returns {JSX.Element} The start screen component.
 */
export default function StartScreen({ onRegister, initialValues = {} }) {
  const [name, setName] = useState(initialValues.name || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{9}[2-9]$/;

  useEffect(() => {
    setName(initialValues.name || "");
    setEmail(initialValues.email || "");
    setPhone(initialValues.phone || "");
  }, [initialValues]);

  function validateName(input) {
    if (input.trim().length <= 1 || /\d/.test(input)) {
      setNameError("Please enter a valid name");
    } else {
      setNameError(null);
    }
  }

  function validateEmail(input) {
    if (!emailRegex.test(input)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null);
    }
  }

  function validatePhone(input) {
    if (!phoneRegex.test(input)) {
      setPhoneError(
        "Phone number must be 10 digits and the last digit cannot be 0 or 1"
      );
    } else {
      setPhoneError(null);
    }
  }

  function handleRegister() {
    if (!name || !email || !phone || !isCheckboxChecked) {
      Alert.alert("Error", "Please fill all fields and check the box.");
      return;
    }

    if (!nameError && !emailError && !phoneError && isCheckboxChecked) {
      onRegister({ name, email, phone });
    } else {
      Alert.alert("Error", "Please fix validation errors.");
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
    <LinearGradient colors={colours.gradient} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome</Text>

        <View style={styles.card}>
          <Input
            label="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateName(text);
            }}
            placeholder="Enter your name"
            errorMessage={nameError}
          />

          <Input
            label="Email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            errorMessage={emailError}
          />

          <Input
            label="Phone Number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              validatePhone(text);
            }}
            placeholder="Enter your phone"
            keyboardType="numeric"
            errorMessage={phoneError}
          />

          <Checkbox
            label="I am not a robot"
            isChecked={isCheckboxChecked}
            onCheck={() => setIsCheckboxChecked(!isCheckboxChecked)}
          />

          <View style={styles.buttonsRow}>
            <CustomButton
              title="Reset"
              onPress={resetForm}
              color={colours.buttonRed}
            />
            <CustomButton
              title="Register"
              onPress={handleRegister}
              disabled={!isCheckboxChecked}
              color={colours.buttonBlue}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "darkblue",
    marginBottom: 20,
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
    width: "100%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
