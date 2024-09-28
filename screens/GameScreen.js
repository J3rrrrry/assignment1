import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Image } from "react-native";
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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(60); 
  const [attemptsLeft, setAttemptsLeft] = useState(4); 
  const [userGuess, setUserGuess] = useState(""); 
  const [gameOverMessage, setGameOverMessage] = useState(""); 

  useEffect(() => {
    if (isGameStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleGameOver("Time's up! You ran out of time.");
    }
  }, [isGameStarted, timer]);

  function handleRestart() {
    setChosenNumber(generateNumber(lastDigit));
    setIsGameStarted(false);
    setTimer(60);
    setAttemptsLeft(4);
    setUserGuess("");
    setGameOverMessage("");
    onRestart();
  }

  function handleGuessSubmit() {
    const guess = parseInt(userGuess, 10);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      Alert.alert("Invalid guess", "Please enter a number between 1 and 100.");
      return;
    }

    if (guess === chosenNumber) {
      handleGameOver(`Congratulations! You guessed the correct number in ${4 - attemptsLeft + 1} attempts.`);
    } else {
      setAttemptsLeft(prev => prev - 1);
      if (attemptsLeft === 1) {
        handleGameOver("You ran out of attempts!");
      } else {
        Alert.alert(
          "Incorrect guess",
          guess > chosenNumber ? "Try a smaller number." : "Try a larger number."
        );
        setUserGuess(""); 
      }
    }
  }

  function handleGameOver(message) {
    setGameOverMessage(message); 
    setIsGameStarted(false); 
  }

  return (
    <View style={styles.container}>
      {!isGameStarted ? (
        gameOverMessage ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>{gameOverMessage}</Text>
            {gameOverMessage.includes("Congratulations") && (
              <Image
                source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
                style={styles.successImage}
              />
            )}
            <CustomButton title="Restart" onPress={handleRestart} color="red" />
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>
              A number has been chosen. It is a multiple of {lastDigit}.
              You have 60 seconds and 4 attempts to guess the correct number.
            </Text>
            <CustomButton title="Start" onPress={() => setIsGameStarted(true)} />
          </View>
        )
      ) : (
        <View>
          <Text style={styles.infoText}>Time left: {timer} seconds</Text>
          <Text style={styles.infoText}>Attempts left: {attemptsLeft}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your guess"
            keyboardType="numeric"
            value={userGuess}
            onChangeText={setUserGuess}
          />
          <CustomButton title="Submit guess" onPress={handleGuessSubmit} />
        </View>
      )}
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
    textAlign: "center",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
  },
  gameOverContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
