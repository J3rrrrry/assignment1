import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Checkbox({ label, isChecked, onCheck }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onCheck}>
      <View style={[styles.box, isChecked && styles.checkedBox]} />
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
  },
  checkedBox: {
    backgroundColor: "#000",
  },
  label: {
    fontSize: 16,
  },
});