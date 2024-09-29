import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Checkbox
 *
 * A checkbox component that displays a label and a box that can be checked or unchecked.
 *
 * @param {string} label - The label text next to the checkbox.
 * @param {boolean} isChecked - Whether the checkbox is checked or not.
 * @param {function} onCheck - Callback function triggered when the checkbox is pressed.
 *
 * @returns {JSX.Element} The checkbox component.
 */
export default function Checkbox({ label, isChecked, onCheck }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onCheck}>
      <View style={[styles.box, isChecked && styles.checkedBox]}>
        {isChecked && (
          <Text style={styles.checkmark}>✔</Text>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: "#007AFF",
  },
  checkmark: {
    color: "white",
    fontSize: 10,
  },
  label: {
    fontSize: 16,
  },
});
