import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import CustomButton from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { LinearGradient } from "expo-linear-gradient";
import colours from "../helper/Colour";

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
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);

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
    
    if (isNaN(guess)) {
      Alert.alert("Invalid Input", "Please enter a valid number.");
      return;
    }

    if (guess < 1 || guess > 100) {
      Alert.alert("Out of Range", "Please enter a number between 1 and 100.");
      return;
    }

    if (guess % lastDigit !== 0) {
      Alert.alert(
        "Invalid Guess",
        `Please enter a number that is a multiple of ${lastDigit}.`
      );
      return;
    }

    if (guess === chosenNumber) {
      setImageUrl(`https://picsum.photos/id/${chosenNumber}/100/100`);
      handleVictory(`Congratulations! You guessed the correct number in ${4 - attemptsLeft + 1} attempts.`);
    } else {
      if (attemptsLeft > 1) {
        setAttemptsLeft((prev) => prev - 1);
        setFeedbackMessage(guess > chosenNumber ? "You should guess lower." : "You should guess higher.");
        setShowFeedbackCard(true);
      } else {
        setFeedbackMessage(guess > chosenNumber ? "You should guess lower." : "You should guess higher.");
        setShowFeedbackCard(true);
        setAttemptsLeft(0);
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
    setShowFeedbackCard(false);
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

  function handleTryAgain() {
    if (attemptsLeft === 0) {
      handleGameOver("You ran out of attempts! Game over.");
    } else {
      setShowFeedbackCard(false);
      setUserGuess("");
    }
  }

  return (
    <LinearGradient colors={colours.gradient} style={styles.gradientBackground}>
      <View style={styles.container}>
        <CustomButton
          title="Restart"
          onPress={handleRestart}
          color={colours.buttonBlue}
          style={styles.restartButton}
        />

        {gameOver ? (
          <Card>
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
              <CustomButton title="New Game" onPress={handleNewGame} color={colours.buttonBlue} />
            </View>
          </Card>
        ) : (
          !showFeedbackCard && (
            <Card>
              {!isGameStarted && !gameOver ? (
                <View>
                  <Text style={styles.title}>
                    Guess a number between 1 & 100 that is a multiple of {lastDigit}
                  </Text>
                  <Text style={styles.infoText}>
                    You have 60 seconds and 4 attempts to guess the number.
                  </Text>
                  <CustomButton title="Start Game" onPress={handleStartGame} color={colours.buttonGreen} />
                </View>
              ) : isGameStarted ? (
                <View>
                  <Text style={styles.title}>
                    Guess a number between 1 & 100 that is a multiple of {lastDigit}
                  </Text>

                  <Input
                    label="Your Guess"
                    value={userGuess}
                    onChangeText={setUserGuess}
                    placeholder="Enter your guess"
                    keyboardType="numeric"
                  />

                  <View style={styles.divider} />
                  <Text style={styles.infoText}>Attempts left: {attemptsLeft}</Text>
                  <Text style={styles.infoText}>Timer: {timer}s</Text>
                  {hintMessage ? <Text style={styles.hintText}>{hintMessage}</Text> : null}
                  <CustomButton title="Use a Hint" onPress={useHint} disabled={hintUsed} color={colours.buttonBlue} />
                  <CustomButton title="Submit guess" onPress={handleGuessSubmit} color={colours.buttonBlue} />
                </View>
              ) : null}
            </Card>
          )
        )}

        {showFeedbackCard && (
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
            <CustomButton title="Try Again" onPress={handleTryAgain} color={colours.buttonGreen} />
            <CustomButton title="End Game" onPress={() => handleGameOver("You ended the game.")} color={colours.buttonRed} />
          </View>
        )}
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
    color: colours.greetingText,
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: colours.dividerColor,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: colours.infoText,
    textAlign: "center",
    marginBottom: 10,
  },
  hintText: {
    fontSize: 16,
    color: colours.greetingText,
    textAlign: "center",
    marginBottom: 20,
  },
  gameOverText: {
    fontSize: 22,
    color: colours.greetingText,
    textAlign: "center",
    marginBottom: 20,
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
  feedbackCard: {
    position: "absolute",
    top: "50%",
    backgroundColor: colours.cardBackground,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  feedbackMessage: {
    fontSize: 18,
    color: colours.feedbackMessage,
    marginBottom: 20,
    textAlign: "center",
  },
});
