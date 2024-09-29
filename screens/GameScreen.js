import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import CustomButton from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { LinearGradient } from "expo-linear-gradient";
import colours from "../helper/Colour";

/**
 * Generates a random number that is a multiple of the last digit of the phone number.
 *
 * @param {number} lastDigit - The last digit of the user's phone number.
 * @returns {number} A random number that is a multiple of the last digit.
 */
function generateNumber(lastDigit) {
  const multiples = [];
  for (let i = lastDigit; i <= 100; i += lastDigit) {
    multiples.push(i);
  }
  return multiples[Math.floor(Math.random() * multiples.length)];
}

/**
 * GameScreen
 *
 * The main game screen where users guess a number that is a multiple of the last digit of their phone number.
 * The game includes a timer, limited attempts, hints, and feedback.
 *
 * @param {string} phone - The user's phone number used to generate the guessing number.
 * @param {function} onRestart - Function to handle when the user wants to restart the game.
 * @param {function} onBackToStart - Function to return to the start screen.
 *
 * @returns {JSX.Element} The game screen component.
 */
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

  /**
   * Handles the restart action, taking the user back to the start screen.
   */
  function handleRestart() {
    onBackToStart();
  }

  /**
   * Handles the logic when the user submits a guess.
   */
  function handleGuessSubmit() {
    if (gameOver) return;

    const guess = parseInt(userGuess, 10);

    if (isNaN(guess)) {
      Alert.alert("Invalid Input", "Please enter a valid number.");
      setAttemptsLeft((prev) => {
        const newAttempts = prev - 1;
        if (newAttempts === 0) {
          handleGameOver("You ran out of attempts! Game over.");
        }
        return newAttempts;
      });
      return;
    }

    if (guess < 1 || guess > 100) {
      Alert.alert("Out of Range", "Please enter a number between 1 and 100.");
      setAttemptsLeft((prev) => {
        const newAttempts = prev - 1;
        if (newAttempts === 0) {
          handleGameOver("You ran out of attempts! Game over.");
        }
        return newAttempts;
      });
      return;
    }

    if (guess % lastDigit !== 0) {
      Alert.alert(
        "Invalid Guess",
        `Please enter a number that is a multiple of ${lastDigit}.`
      );
      setAttemptsLeft((prev) => {
        const newAttempts = prev - 1;
        if (newAttempts === 0) {
          handleGameOver("You ran out of attempts! Game over.");
        }
        return newAttempts;
      });
      return;
    }

    if (guess === chosenNumber) {
      setImageUrl(`https://picsum.photos/id/${chosenNumber}/100/100`);
      handleVictory(`You guessed correct! Attempts used: ${4 - attemptsLeft + 1}`);
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

  /**
   * Handles when the user wins the game.
   *
   * @param {string} message - The victory message.
   */
  function handleVictory(message) {
    setGameResultMessage(message);
    setGameOver(true);
    setIsGameStarted(false);
  }

  /**
   * Handles when the game is over, either by running out of attempts or time.
   *
   * @param {string} message - The game over message.
   */
  function handleGameOver(message) {
    setGameResultMessage(message);
    setGameOver(true);
    setIsGameStarted(false);
    setShowFeedbackCard(false);
  }

  /**
   * Provides a hint to the user about the range of the number.
   */
  function useHint() {
    if (!hintUsed) {
      setHintMessage(chosenNumber > 50 ? "The number is greater than 50." : "The number is less than or equal to 50.");
      setHintUsed(true);
    }
  }

  /**
   * Starts a new game, resetting the state.
   */
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

  /**
   * Resets the game, allowing the user to start over with a new number.
   */
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

  /**
   * Allows the user to try guessing again after an incorrect attempt.
   */
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
        <View style={styles.restartButtonContainer}>
          <CustomButton
            title="Restart"
            onPress={handleRestart}
            color={colours.buttonBlue}
            style={styles.restartButton}
          />
        </View>

        <View style={styles.contentContainer}>
          {gameOver ? (
            <Card>
              <View>
                {gameResultMessage.includes("correct") ? (
                  <View style={styles.imageContainer}>
                    <Text style={styles.gameOverText}>{gameResultMessage}</Text>
                    {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.successImage} /> : null}
                  </View>
                ) : (
                  <View style={styles.imageContainer}>
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
  restartButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 10,
  },
  restartButton: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
