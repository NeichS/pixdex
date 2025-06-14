import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
} from "react-native";
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
    removeTypeFilter,
    addGenreFilter,
    removeGenreFilter,
    getTypeFilter,
    getGenreFilter,

    // suponiendo que tenés funciones para limpiar filtros
  } = useContext(ContextoFilter);

  const tipos = getAllTipos();
  const generos = getAllGeneros();

  // Estado local de checks
  const [checks, setChecks] = useState<boolean[]>([]);
  const [checksGeneros, setChecksGeneros] = useState<boolean[]>([]);

  // Sincronizo al abrir el modal o cuando cambian filtros en contexto
  useEffect(() => {
    setChecks(tipos.map((t) => getTypeFilter.includes(t.id)));
    setChecksGeneros(generos.map((g) => getGenreFilter.includes(g.id)));
  }, [visible, tipos, generos, getTypeFilter, getGenreFilter]);

  // Función genérica para tipos
  const toggleCheck = (index: number, tipoID: number) => {
    setChecks((prev) => {
      const nuevo = [...prev];
      nuevo[index] = !prev[index];
      // Ahora sí, según nuevo valor agrego o quito del contexto
      if (nuevo[index]) addTypeFilter(tipoID);
      else removeTypeFilter(tipoID);
      return nuevo;
    });
  };

  // Función genérica para géneros
  const toggleCheckGenre = (index: number, generoID: number) => {
    setChecksGeneros((prev) => {
      const nuevo = [...prev];
      nuevo[index] = !prev[index];
      if (nuevo[index]) addGenreFilter(generoID);
      else removeGenreFilter(generoID);
      return nuevo;
    });
  };

  // Si querés que “APPLY” resetee todo antes de volver a aplicar:
  const onApply = () => {
    // vuelvo a agregar con el estado local actual
    checks.forEach((v, i) => { if (v) addTypeFilter(tipos[i].id) });
    checksGeneros.forEach((v, i) => { if (v) addGenreFilter(generos[i].id) });
    onClose();
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Header */}
          <View style={styles.modalContent}>
            <TextPressStart2P style={styles.title}>Filtrar Contenido</TextPressStart2P>
            <Pressable onPress={onClose}>
              <AntDesign name="closecircleo" size={24} color="#6E59A5" />
            </Pressable>
          </View>

          {/* Tipos */}
          <TextPressStart2P style={styles.greenTitle}>Tipos de contenido</TextPressStart2P>
          {tipos.map((tipo, idx) => (
            <View key={tipo.id} style={styles.checkBoxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={checks[idx]}
                onValueChange={() => toggleCheck(idx, tipo.id)}
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
                  onValueChange={() => toggleCheckGenre(idx, g.id)}
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
            <Button label="CANCELAR" action={onClose} background="#403E43" />
            <Button label="APLICAR FILTROS" action={onApply} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ...Tus estilos ...

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
