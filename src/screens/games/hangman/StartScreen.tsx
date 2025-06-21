import { router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import { TextPressStart2P } from "../../components/TextPressStart2P";

export function StartScreen() {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="BACK" action={router.back} iconName="arrow-back" />
      </View>

      <View style={styles.gameContainer}>
        <TextPressStart2P
          style={{ fontSize: 24, color: "white", marginBottom: 10 }}
        >
          <Text>Hangman</Text>
        </TextPressStart2P>
        <TextPressStart2P
          style={{ fontSize: 16, color: "white", textAlign: "center" }}
        >
          Adivina la palabra oculta antes de quedarte sin vidas.
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
