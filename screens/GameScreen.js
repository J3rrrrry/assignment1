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

export default function GameScreen({ phone, onRestart, onBackToStart }) {
  const lastDigit = parseInt(phone.slice(-1), 10);
  const [chosenNumber, setChosenNumber] = useState(generateNumber(lastDigit));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [userGuess, setUserGuess] = useState("");
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [hintMessage, setHintMessage] = useState("");
  const [gameOverReason, setGameOverReason] = useState("");

  useEffect(() => {
    if (isGameStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleGameOver("Time's up! You ran out of time.", "Time limit exceeded");
    }
  }, [isGameStarted, timer]);

  // Restart the game by taking the user back to the start screen and resetting all data
  function handleRestart() {
    onBackToStart(); // This will take the user back to the StartScreen
  }

  // Generate a new number and start a new game
  function handleNewGame() {
    setChosenNumber(generateNumber(lastDigit));
    setIsGameStarted(false);
    setTimer(60);
    setAttemptsLeft(4);
    setUserGuess("");
    setGameOverMessage("");
    setHintUsed(false);
    setHintMessage("");
    setGameOverReason("");
    setIsGameStarted(true);
  }

  function handleGuessSubmit() {
    const guess = parseInt(userGuess, 10);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      Alert.alert("Invalid guess", "Please enter a number between 1 and 100.");
      return;
    }

    if (guess === chosenNumber) {
      handleGameOver(`Congratulations! You guessed the correct number in ${4 - attemptsLeft + 1} attempts.`, "Correct guess");
    } else {
      setAttemptsLeft(prev => prev - 1);
      if (attemptsLeft === 1) {
        handleGameOver("You ran out of attempts!", "Attempts exhausted");
      } else {
        Alert.alert(
          "Incorrect guess",
          guess > chosenNumber ? "Try a smaller number." : "Try a larger number."
        );
        setUserGuess("");
      }
    }
  }

  function handleGameOver(message, reason) {
    setGameOverMessage(message);
    setGameOverReason(reason);
    setIsGameStarted(false);
  }

  function useHint() {
    if (!hintUsed) {
      if (chosenNumber > 50) {
        setHintMessage("The number is greater than 50.");
      } else {
        setHintMessage("The number is less than or equal to 50.");
      }
      setHintUsed(true);
    }
  }

  return (
    <View style={styles.container}>
      {!isGameStarted ? (
        gameOverMessage ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>{gameOverMessage}</Text>
            <Text style={styles.gameOverReasonText}>Reason: {gameOverReason}</Text>
            {hintUsed && <Text style={styles.hintText}>Hint was used.</Text>}
            {gameOverMessage.includes("Congratulations") && (
              <Image
                source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
                style={styles.successImage}
              />
            )}
            <CustomButton title="New Game" onPress={handleNewGame} color="green" />
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
          {hintMessage ? <Text style={styles.hintText}>{hintMessage}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Enter your guess"
            keyboardType="numeric"
            value={userGuess}
            onChangeText={setUserGuess}
          />
          <CustomButton title="Submit guess" onPress={handleGuessSubmit} />
          <CustomButton
            title="Use a hint"
            onPress={useHint}
            disabled={hintUsed}
            color="orange"
          />
          {/* Restart button on top right corner */}
          <CustomButton title="Restart" onPress={handleRestart} color="red" />
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
  hintText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
    color: "blue",
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
  gameOverReasonText: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
