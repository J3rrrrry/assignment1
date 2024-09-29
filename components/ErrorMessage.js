import React from "react";
import { Text, StyleSheet } from "react-native";

/**
 * ErrorMessage
 *
 * A simple component to display error messages in red text.
 *
 * @param {string} message - The error message to display.
 *
 * @returns {JSX.Element} The styled error message.
 */
export default function ErrorMessage({ message }) {
  return <Text style={styles.errorText}>{message}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
