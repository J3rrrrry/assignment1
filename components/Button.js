import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

/**
 * CustomButton
 *
 * A simple button component.
 *
 * @param {string} title - The text to display.
 * @param {function} onPress - The function to call when pressed.
 * @param {string} [color="blue"] - Button background color.
 * @param {boolean} [disabled=false] - If true, button is disabled.
 *
 * @returns {JSX.Element} The button element.
 */
export default function CustomButton({ title, onPress, color = "blue", disabled = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#ccc" : color },
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
