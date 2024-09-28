import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import StartScreen from "./screens/StartScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  function handleGameStart() {
    setConfirmVisible(false);
    setCurrentScreen("game");
  }

  function handleRegister(user) {
    setUserInfo(user);
    setConfirmVisible(true);
  }

  function handleEdit() {
    setConfirmVisible(false);
  }

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
