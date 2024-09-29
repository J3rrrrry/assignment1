import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import colours from "../helper/Colour";

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
