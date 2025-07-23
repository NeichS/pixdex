import { Modal, Text, View, StyleSheet, TextInput } from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";
import { Button } from "@/src/screens/components/Button";
import { ROUTES } from "@/src/navigation/routes";
import { router } from "expo-router";

interface PropsModal {
  visible: boolean;
  onClose: () => void;
  score: number;
}

export function GameOverModal({ visible, onClose, score }: PropsModal) {
  
  if (visible) {
    console.log("GameOverModal rendered with score:", score);

    //publicar score en la base de datos de supabase
    
  }
  const onClickBackToHome = () => {
    onClose();
    router.push(ROUTES.HOME);
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
            <Text style={styles.title}>Game over!</Text>
          </TextPressStart2P>
          <View style={styles.button}>
            <Button label="TRY AGAIN" action={onClose} />
            <Button label="BACK TO HOME" action={onClickBackToHome} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
