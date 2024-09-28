import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Image } from "react-native";
import CustomButton from "../components/Button";
import Card from "../components/Card";
import { LinearGradient } from "expo-linear-gradient";

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
  const [hintUsed, setHintUsed] = useState(false);
  const [hintMessage, setHintMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameResultMessage, setGameResultMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isGameStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && isGameStarted) {
      handleGameOver("You are out of time");
    }
  }, [isGameStarted, timer]);

  function handleRestart() {
    onBackToStart();
  }

  function handleGuessSubmit() {
    if (gameOver) return;

    const guess = parseInt(userGuess, 10);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      Alert.alert("Invalid guess", "Please enter a number between 1 and 100.");
      return;
    }

    if (guess === chosenNumber) {
      setImageUrl(`https://picsum.photos/id/${chosenNumber}/100/100`);
      handleVictory(`Congratulations! You guessed the correct number in ${4 - attemptsLeft + 1} attempts.`);
    } else {
      if (attemptsLeft > 1) {
        setAttemptsLeft((prev) => prev - 1);
        Alert.alert(
          "Incorrect guess",
          guess > chosenNumber ? "You should guess lower." : "You should guess higher."
        );
      } else {
        handleGameOver("You ran out of attempts! Game over.");
      }
    }
  }

  function handleVictory(message) {
    setGameResultMessage(message);
    setGameOver(true);
    setIsGameStarted(false);
  }

  function handleGameOver(message) {
    setGameResultMessage(message);
    setGameOver(true);
    setIsGameStarted(false);
  }

  function useHint() {
    if (!hintUsed) {
      setHintMessage(chosenNumber > 50 ? "The number is greater than 50." : "The number is less than or equal to 50.");
      setHintUsed(true);
    }
  }

  function handleStartGame() {
    setIsGameStarted(true);
    setGameOver(false);
    setTimer(60);
    setAttemptsLeft(4);
    setHintUsed(false);
    setHintMessage("");
    setUserGuess("");
    setChosenNumber(generateNumber(lastDigit));
  }

  function handleNewGame() {
    setChosenNumber(generateNumber(lastDigit));
    setGameOver(false);
    setIsGameStarted(false);
    setTimer(60);
    setAttemptsLeft(4);
    setUserGuess("");
    setHintUsed(false);
    setHintMessage("");
    setImageUrl("");
  }

  return (
    <LinearGradient
      colors={["rgba(173, 216, 230, 0.8)", "rgba(135, 206, 250, 0.8)", "rgba(0, 191, 255, 0.8)"]}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <CustomButton
          title="Restart"
          onPress={handleRestart}
          color="blue"
          style={styles.restartButton}
        />
        <Card>
          {!isGameStarted && !gameOver ? (
            <View>
              <Text style={styles.title}>Guess a number between 1 & 100 that is multiply of {lastDigit}</Text>
              <Text style={styles.infoText}>You have 60 seconds and 4 attempts to guess the number.</Text>
              <CustomButton title="Start Game" onPress={handleStartGame} color="green" />
            </View>
          ) : isGameStarted ? (
            <View>
              <Text style={styles.title}>Guess a number between 1 & 100 that is multiply of {lastDigit}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your guess"
                keyboardType="numeric"
                value={userGuess}
                onChangeText={setUserGuess}
              />
              <View style={styles.divider} />
              <Text style={styles.infoText}>Attempts left: {attemptsLeft}</Text>
              <Text style={styles.infoText}>Timer: {timer}s</Text>
              {hintMessage ? <Text style={styles.hintText}>{hintMessage}</Text> : null}
              <CustomButton title="Use a Hint" onPress={useHint} disabled={hintUsed} color="blue" />
              <CustomButton title="Submit guess" onPress={handleGuessSubmit} color="blue" />
            </View>
          ) : (
            <View>
              {gameResultMessage.includes("Congratulations") ? (
                <View>
                  <Text style={styles.gameOverText}>{gameResultMessage}</Text>
                  {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.successImage} /> : null}
                </View>
              ) : (
                <View>
                  <Text style={styles.gameOverText}>The game is over!</Text>
                  <Image source={require('../assets/sad.png')} style={styles.sadImage} />
                  <Text style={styles.infoText}>{gameResultMessage}</Text>
                </View>
              )}
              <CustomButton title="New Game" onPress={handleNewGame} color="blue" />
            </View>
          )}
        </Card>
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
    position: "relative",
  },
  restartButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "purple",
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "purple",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  hintText: {
    fontSize: 16,
    color: "purple",
    textAlign: "center",
    marginBottom: 20,
  },
  gameOverText: {
    fontSize: 22,
    color: "purple",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    textAlign: "center",
    marginBottom: 10,
  },
  successImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  sadImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

