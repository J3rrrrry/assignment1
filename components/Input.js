import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import colours from "../helper/Colour";

/**
 * Input
 *
 * A customizable input component that supports labels, error messages, and various input configurations.
 *
 * @param {string} label - The label text for the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChangeText - Callback to handle input changes.
 * @param {string} [placeholder] - Placeholder text for the input field.
 * @param {string} [errorMessage] - Error message to display if validation fails.
 * @param {string} [keyboardType="default"] - Type of keyboard to display (e.g., "numeric", "email-address").
 * @param {boolean} [secureTextEntry=false] - If true, the input field will hide the text (for passwords).
 * @param {number} [maxLength] - Maximum number of characters allowed in the input field.
 *
 * @returns {JSX.Element} The input component.
 */
export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
  keyboardType = "default",
  secureTextEntry = false,
  maxLength,
}) {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          errorMessage ? styles.inputError : styles.inputDefault,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colours.greetingText,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    padding: 10,
    fontSize: 16,
  },
  inputDefault: {
    borderBottomColor: colours.inputBorder,
  },
  inputError: {
    borderBottomColor: "red",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
});
