import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextPressStart2P } from "./TextPressStart2P";
import { useContext, useState } from "react";
import { ContextoContenidos } from "@/src/context/Contenidos";
import { Button } from "./Button";

interface PropsFilterModal {
  visible: boolean;
  onClose: () => void;
}

/*iterar de vuelta los tipos de contenidos
y tambien iterar todos los tags
*/
export function FilterModal({ visible, onClose }: PropsFilterModal) {
  const { getAllTipos, getAllGeneros } = useContext(ContextoContenidos);
  const [checks, setChecks] = useState<boolean[]>(
    Array(getAllTipos().length).fill(false)
  );
  const [checksGeneros, setChecksGeneros] = useState<boolean[]>(
    Array(getAllGeneros().length).fill(false)
  );

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
          {getAllTipos().map((tipo, idx) => {
            return (
              <View key={idx} style={styles.checkBoxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={checks[idx]}
                  onValueChange={() => toggleCheck(idx)}
                  color={checks[idx] ? "#6E59A5" : undefined}
                />
                <Text style={styles.checkboxText}>
                  {tipo.plural.charAt(0).toUpperCase() + tipo.plural.slice(1)}
                </Text>
              </View>
            );
          })}
          <TextPressStart2P style={styles.greenTitle}>Genres</TextPressStart2P>
          <View style={styles.genresContainer}>
            {getAllGeneros().map((genero, idx) => {
              return (
                <View key={idx} style={styles.checkBoxContainer}>
                  <Checkbox
                    style={styles.checkbox}
                    value={checksGeneros[idx]}
                    onValueChange={() => {
                      setChecksGeneros((prevChecks) => {
                        const nuevosChecks = prevChecks.map((valor, i) =>
                          i === idx ? !valor : valor
                        );
                        return nuevosChecks;
                      });
                    }}
                    color={checksGeneros[idx] ? "#6E59A5" : undefined}
                  />
                  <Text style={styles.checkboxText}>
                    {genero.nombre.charAt(0).toUpperCase() +
                      genero.nombre.slice(1)}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.botonesContainer}>
            <Button label="CANCEL" action={onClose} background="#403E43" />
            <Button label="APLY FILTERS" action={() => {}} />
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
    maxHeight: 20,
  },
  checkbox: {
    borderColor: "#6E59A5",
  },
  checkboxText: {
    color: "white",
  },
  genresContainer: {
    flexDirection: "column",
    gap: 10,
    maxHeight: 250,
    flexWrap: "wrap",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 10,
    gap: 10,
  },
});
