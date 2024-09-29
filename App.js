import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import StartScreen from "./screens/StartScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import GameScreen from "./screens/GameScreen";

/**
 * App
 *
 * The main component that controls the navigation between the StartScreen, ConfirmScreen, and GameScreen.
 * Manages user information and handles transitions between different screens.
 *
 * @returns {JSX.Element} The main app component.
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  /**
   * Starts the game by transitioning to the GameScreen and hiding the ConfirmScreen.
   */
  function handleGameStart() {
    setConfirmVisible(false);
    setCurrentScreen("game");
  }

  /**
   * Registers the user information and shows the ConfirmScreen for confirmation.
   *
   * @param {Object} user - The user's information, including name, email, and phone.
   */
  function handleRegister(user) {
    setUserInfo(user);
    setConfirmVisible(true);
  }

  /**
   * Edits the user's information by returning to the StartScreen from the ConfirmScreen.
   */
  function handleEdit() {
    setConfirmVisible(false);
  }

  /**
   * Restarts the app, resetting the user information and navigating back to the StartScreen.
   */
  function handleRestart() {
    setCurrentScreen("start");
    setUserInfo({ name: "", email: "", phone: "" });
  }

  let content;
  if (currentScreen === "start") {
    content = <StartScreen onRegister={handleRegister} initialValues={userInfo} />;
  } else if (currentScreen === "game") {
    content = (
      <GameScreen 
        phone={userInfo.phone} 
        onRestart={handleRestart}
        onBackToStart={handleRestart}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {content}
      {isConfirmVisible && (
        <ConfirmScreen 
          userInfo={userInfo} 
          visible={isConfirmVisible} 
          onEdit={handleEdit} 
          onGameStart={handleGameStart}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
