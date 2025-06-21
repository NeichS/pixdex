import { router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import { TextPressStart2P } from "../../components/TextPressStart2P";
import { useState } from "react";
import { NameModal } from "./components/NameModal";

export function StartScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
      setModalVisible(true);  
    };
  
    const onCloseModal = () => {
      setModalVisible(false);
    };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="BACK" action={router.back} iconName="arrow-back" />
      </View>
      <View style={styles.gameContainer}>
        <TextPressStart2P
          style={{ fontSize: 24, color: "white" }}
        >
          <Text style={ styles.title}>
            Hangman Challenge
          </Text>
        </TextPressStart2P>
        <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>
          Guess the titles of popular TV shows, movies, and anime one letter at
          a time. You have 5 lives - can you get the highest score?
        </Text>
        <Button label="START GAME" action={openModal} />
        <NameModal visible={modalVisible} onClose={onCloseModal} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    padding: 20,
    gap: 10,
  },
  topContainer: {
    width: 120,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  gameContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#403E43",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    color: "#6E59A5", 
    textAlign: "center"
  }
});
