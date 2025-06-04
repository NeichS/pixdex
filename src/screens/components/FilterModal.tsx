import { StyleSheet, Text, View, Pressable, Alert, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextPressStart2P } from "./TextPressStart2P";
import { useState } from "react";

interface PropsFilterModal {
  visible: boolean;
  onClose: () => void;
}

/*iterar de vuelta los tipos de contenidos
y tambien iterar todos los tags
*/
export function FilterModal({ visible, onClose }: PropsFilterModal) {
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const toggleCheck = (index: number) => {
    setChecks((prevChecks) => {
      const nuevosChecks = prevChecks.map((valor, i) =>
        i === index ? !valor : valor
      );
      return nuevosChecks;
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TextPressStart2P style={styles.title}>
              Filter Content
            </TextPressStart2P>
            <Pressable onPress={onClose}>
              <AntDesign
                style={{ marginTop: -8 }}
                name="closecircleo"
                size={24}
                color="#6E59A5"
              />
            </Pressable>
          </View>
          <TextPressStart2P style={styles.greenTitle}>
            Content types
          </TextPressStart2P>
          {/* deshardcodear esto jajaj */}
          <View style={styles.checkBoxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={checks[0]}
              onValueChange={() => toggleCheck(0)}
              color={checks[0] ? "#6E59A5" : undefined}
            />
            <Text style={styles.checkboxText}>TV Shows</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={checks[1]}
              onValueChange={() => toggleCheck(1)}
              color={checks[1] ? "#6E59A5" : undefined}
            />
            <Text style={styles.checkboxText}>Animes</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={checks[2]}
              onValueChange={() => toggleCheck(2)}
              color={checks[2] ? "#6E59A5" : undefined}
            />
            <Text style={styles.checkboxText}>Movies</Text>
          </View>
          <TextPressStart2P style={styles.greenTitle}>Genres</TextPressStart2P>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "#403E43",
    padding: 15,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: "#8E9196",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
  modalContent: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    textAlign: "left",
  },
  greenTitle: {
    color: "#5FD068",
  },
  checkBoxContainer: {
    flexDirection: "row",
    verticalAlign: "bottom",
    gap: 10,
  },
  checkbox: {
    borderColor: "#6E59A5",
  },
  checkboxText: {
    color: "white",
  },
});
