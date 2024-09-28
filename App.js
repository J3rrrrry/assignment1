import React, { useState } from "react";  
import { StyleSheet, SafeAreaView } from "react-native";
import StartScreen from "./screens/StartScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });

  function handleGameStart() {
    setCurrentScreen("game");
  }

  function handleRegister(user) {
    setUserInfo(user);
    setCurrentScreen("confirm");
  }

  function handleRestart() {
    setCurrentScreen("start");
    setUserInfo({ name: "", email: "", phone: "" });
  }

  let content;
  if (currentScreen === "start") {
    content = <StartScreen onRegister={handleRegister} />;
  } else if (currentScreen === "confirm") {
    content = (
      <ConfirmScreen 
        userInfo={userInfo} 
        onGameStart={handleGameStart}
      />
    );
  } else if (currentScreen === "game") {
    content = <GameScreen phone={userInfo.phone} onRestart={handleRestart} />;
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
