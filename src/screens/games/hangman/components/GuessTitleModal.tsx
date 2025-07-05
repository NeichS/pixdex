import { Modal, Text, View, StyleSheet, TextInput } from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";
import { Button } from "@/src/screens/components/Button";
import { useState } from "react";

interface PropsModal {
  visible: boolean;
  onClose: () => void;
  onGuess: (title: string) => void;
}

export function GuessTitleModal({ visible, onClose, onGuess }: PropsModal) {
  const [inputValue, setInputValue] = useState("");

  const submitGuess = () => {
    if (inputValue.trim() === "") return;    
    onGuess(inputValue.trim());
    setInputValue("");
    onClose();
  };

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
            <Text style={styles.title}>Guess the Title</Text>
          </TextPressStart2P>

          <TextInput
            style={styles.input}
            placeholder="Escribe tu intento..."
            placeholderTextColor="#AAA"
            value={inputValue}
            onChangeText={setInputValue}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <View style={styles.button}>
            <Button
              label="SUBMIT GUESS"
              action={submitGuess}
              disabled={inputValue.trim() === ""}
            />
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
  input: {
    borderColor: "#6E59A5",
    borderWidth: 1,
    height: 40,
    width: "100%",
    color: "#FFFFFF",
    paddingHorizontal: 8,
  },
  button: {
    alignSelf: "flex-end",
  },
});
