import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ContextoPlayerName } from "@/src/context/PlayerName";
import { Text, StyleSheet, View } from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";
import { Button } from "@/src/screens/components/Button";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export function Game() {
  const { getPlayerName } = useContext(ContextoPlayerName);

  const playerName = getPlayerName();

  const handleBackToHome = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="EXIT" action={handleBackToHome} iconName="arrow-back" />
        <View style={styles.gameStatus}>
          <View style={styles.hearts}>
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
          </View>
          <Text style={styles.info}>Player : {playerName} </Text>
          <Text style={styles.info}>Score : 0</Text>
        </View>
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.actionButtons}>
          <Button label="GUESS TITLE" action={() => {}} />
          <Button label="GUESS LETTER" action={() => {}}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    padding: 10,
    gap: 10,
  },
  topContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  gameStatus: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  hearts: {
    flexDirection: "row",
    gap: 4,
  },
  info: {
    color: "white",
    textAlign: "right",
    alignSelf: "flex-end",
  },
  gameContainer: {
    flex: 1,
    borderColor: "#403E43",
    borderWidth: 2,
    padding: 10,
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 4,
  }
});
