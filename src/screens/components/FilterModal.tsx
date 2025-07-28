import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextPressStart2P } from "./TextPressStart2P";
import { useContext, useState, useEffect } from "react";
import { ContextoContenidos } from "@/src/context/Contenidos";
import { ContextoFilter } from "@/src/context/Filter";
import { Button } from "./Button";

interface PropsFilterModal {
  visible: boolean;
  onClose: () => void;
}

export function FilterModal({ visible, onClose }: PropsFilterModal) {
  const { getAllTipos, getAllGeneros } = useContext(ContextoContenidos);
  const {
    addTypeFilter,
    addGenreFilter,
    getTypeFilter,
    getGenreFilter,
    clearTypeFilter,
    clearGenreFilter,
  } = useContext(ContextoFilter);

  const tipos = getAllTipos();
  const generos = getAllGeneros();

  // Estado local de checks
  const [checks, setChecks] = useState<boolean[]>([]);
  const [checksGeneros, setChecksGeneros] = useState<boolean[]>([]);

  // Sincronizo al abrir el modal o cuando cambian filtros en contexto
  useEffect(() => {
    setChecks(tipos.map((t) => getTypeFilter().includes(t.id)));
    setChecksGeneros(generos.map((g) => getGenreFilter().includes(g.id)));
  }, [tipos, generos, getTypeFilter, getGenreFilter]);

  const toggleCheck = (index: number) => {
    setChecks((prev) => {
      const nuevo = [...prev];
      nuevo[index] = !prev[index];
      return nuevo;
    });
  };

  const toggleCheckGenre = (index: number) => {
    setChecksGeneros((prev) => {
      const nuevo = [...prev];
      nuevo[index] = !prev[index];
      return nuevo;
    });
  };

  const onApply = () => {
    clearGenreFilter();
    clearTypeFilter();

    checks.forEach((activo, i) => {
      if (activo) addTypeFilter(tipos[i].id);
    });
    checksGeneros.forEach((activo, i) => {
      if (activo) addGenreFilter(generos[i].id);
    });

    onClose();
  };

  const onClear = () => {
    setChecks(tipos.map(() => false));
    setChecksGeneros(generos.map(() => false));
  }

  return (
    <Modal
      animationType="slide"
      backdropColor="rgba(0,0,0,0.25)"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Header */}
          <View style={styles.modalContent}>
            <TextPressStart2P style={styles.title}>
              Filtrar Contenido
            </TextPressStart2P>
            <Pressable onPress={onClose}>
              <AntDesign
                name="closecircleo"
                size={24}
                color="#6E59A5"
                style={styles.modalClose}
              />
            </Pressable>
          </View>

          {/* Tipos */}
          <TextPressStart2P style={styles.greenTitle}>
            Tipos de contenido
          </TextPressStart2P>
          {tipos.map((tipo, idx) => (
            <View key={tipo.id} style={styles.checkBoxContainer}>
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
          ))}

          {/* Géneros */}
          <TextPressStart2P style={styles.greenTitle}>Géneros</TextPressStart2P>
          <View style={styles.genresContainer}>
            {generos.map((g, idx) => (
              <View key={g.id} style={styles.checkBoxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={checksGeneros[idx]}
                  onValueChange={() => toggleCheckGenre(idx)}
                  color={checksGeneros[idx] ? "#6E59A5" : undefined}
                />
                <Text style={styles.checkboxText}>
                  {g.nombre.charAt(0).toUpperCase() + g.nombre.slice(1)}
                </Text>
              </View>
            ))}
          </View>

          {/* Botones */}
          <View style={styles.botonesContainer}>
            <Button label="RESETEAR" action={onClear} background="#403E43" />
            <Button label="APLICAR FILTROS" action={onApply} />
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
  modalClose: {
    marginRight: -20,
    marginTop: -5,
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
    justifyContent: "space-between",
    width: "auto",
    marginTop: 10,
    gap: 10,
  },
});
