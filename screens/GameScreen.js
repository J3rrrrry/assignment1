import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/Button";

function generateNumber(lastDigit) {
  const multiples = [];
  for (let i = lastDigit; i <= 100; i += lastDigit) {
    multiples.push(i);
  }
  return multiples[Math.floor(Math.random() * multiples.length)];
}

export default function GameScreen({ phone, onRestart }) {
  const lastDigit = parseInt(phone.slice(-1), 10);
  const [chosenNumber, setChosenNumber] = useState(generateNumber(lastDigit));

  function handleRestart() {
    setChosenNumber(generateNumber(lastDigit));
    onRestart();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        A number has been chosen. It is a multiple of {lastDigit}.
      </Text>
      <CustomButton title="Restart" onPress={handleRestart} color="red" />
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
  infoText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
