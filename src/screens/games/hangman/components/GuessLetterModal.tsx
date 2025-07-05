import { Modal, Text, View, StyleSheet } from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";
import { Button } from "@/src/screens/components/Button";

interface PropsModal {
  visible: boolean;
  onClose: () => void;
  onGuess: (letter: string) => void;
  guessedLetters: string[]; // opcional: para deshabilitar ya adivinadas
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GuessLetterModal({
  visible,
  onClose,
  onGuess,
  guessedLetters = [],
}: PropsModal) {
  return (
    <Modal
      animationType="slide"
      backdropColor="rgba(0,0,0,0.25)"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.content}>
          <TextPressStart2P>
            <Text style={styles.title}>Guess a Letter</Text>
          </TextPressStart2P>
          <View style={styles.lettersGrid}>
            {ALPHABET.map((letter) => {
              const disabled = guessedLetters.includes(letter);
              return (
                <View key={letter} style={styles.letterButton}>
                  <Button
                    label={letter}
                    action={() => onGuess(letter)}
                    disabled={disabled} 
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.closeButton}>
            <Button label="CANCEL" action={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 5,
  },
  content: {
    width: "90%",
    backgroundColor: "#1A1F2C",
    borderRadius: 8,
    padding: 20,
    gap: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },

  lettersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  letterButton: {
    width: "14%",
    marginVertical: 4,
  },

  closeButton: {
    marginTop: 12,
    alignSelf: "center",
  },
});
