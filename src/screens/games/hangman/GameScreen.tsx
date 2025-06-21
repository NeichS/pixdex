import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ContextoPlayerName } from "@/src/context/PlayerName";
import { Text } from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";

export function Game() {
  const { getPlayerName } = useContext(ContextoPlayerName);

  const playerName = getPlayerName();

  return (
    <SafeAreaView>
      <TextPressStart2P>
        <Text>Welcome to the Hangman Game, {playerName}!</Text>
      </TextPressStart2P>
    </SafeAreaView>
  );
}
