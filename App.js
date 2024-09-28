import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import StartScreen from "./screens/StartScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");

  function handleRegister() {
    setCurrentScreen("confirm");
  }

  function handleGameStart() {
    setCurrentScreen("game");
  }

  let content;
  if (currentScreen === "start") {
    content = <StartScreen onRegister={handleRegister} />;
  } else if (currentScreen === "confirm") {
    content = <ConfirmScreen onGameStart={handleGameStart} />;
  } else if (currentScreen === "game") {
    content = <GameScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {content}
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
