import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextPressStart2P } from "./components/TextPressStart2P";
import { Button } from "./components/Button";
interface GameProps {
  gameName: string;
  gameDescription: string;
  leaderboard?: string[]; //proximamente
  gameScreen: string; // url del juego
}

export function GameInitSreen({
  gameName,
  gameDescription,
  gameScreen,
}: GameProps) {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="BACK" action={router.back} iconName="arrow-back" />
      </View>

      <View style={styles.gameContainer}>
        <TextPressStart2P
          style={{ fontSize: 24, color: "white", marginBottom: 10 }}
        > 
          {gameName}
        </TextPressStart2P>
        <TextPressStart2P
          style={{ fontSize: 16, color: "white", textAlign: "center" }}
        >
          {gameDescription}
        </TextPressStart2P>
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
  },
});
