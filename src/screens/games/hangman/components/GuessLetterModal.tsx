import { Modal, Text, View, StyleSheet, TextInput } from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";

interface PropsModal {
  visible: boolean;
  onClose: () => void;
}

export function GuessLetterModal({ visible, onClose }: PropsModal) {
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
    width: "100%",
    height: 150,
    flexDirection: "column",
    backgroundColor: "#1A1F2C",
    borderBottomWidth: 1,
    borderBottomColor: "#403E43",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
  input: {
    borderColor: "#6E59A5",
    borderWidth: 1,
    height: 40,
    width: "100%",
    color: "#FFFFFF",
  },
  button: {
    alignSelf: "flex-end",
  },
});
