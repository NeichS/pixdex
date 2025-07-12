import { ScrollView, View, StyleSheet, Text } from "react-native";
import { CajaJuego } from "./components/CajaJuego";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextPressStart2P } from "./components/TextPressStart2P";
import { Button } from "./components/Button";
import { Contenido } from "./components/Contenido";
import { useState } from "react";
import { FilterModal } from "./components/FilterModal";
import { useContext } from "react";
import { ContextoFilter } from "@/src/context/Filter";
import { ROUTES } from "../navigation/routes";
import { RelativePathString } from "expo-router";
import { signOut } from "../lib/supabase";

export function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { isFiltered } = useContext(ContextoFilter);
  const openModal = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const filterIconColor: string = isFiltered() ? "#5FD068" : "white";

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TextPressStart2P style={styles.h1}>Pixdex</TextPressStart2P>
        <Button
          label="FILTRAR"
          action={openModal}
          iconName="filter"
          iconColor={filterIconColor}
        />
      </View>
      <FilterModal visible={modalVisible} onClose={onCloseModal} />
      <View style={styles.cajaJuegoContainer}>
        <CajaJuego
          title="Desafio del ahorcado"
          description="Adivina los títulos letra por letra ¿Cuántos puedes identificar?"
          bgColor="#6E59A5"
          juegoUrl={ROUTES.HANGMAN as RelativePathString}
        />
        <CajaJuego
          title="Pixel reveal"
          description="Identifica títulos desde imagenes pixeladas. ¡Pon a prueba tu memoria visual!"
          bgColor="#5FD068"
          juegoUrl={ROUTES.HOME as RelativePathString}
        />
      </View>

      <View style={styles.contenidoContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContenido}>
          <Contenido />

          <View style={styles.logoutButton}>
            <Button action={signOut} label="LOG OUT" iconName="power" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    gap: 5,
    paddingBottom: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
    padding: 4,
  },
  h1: {
    color: "#6E59A5",
    fontSize: 24,
    fontWeight: 500,
  },
  cajaJuegoContainer: {
    flexDirection: "row",
    gap: 4,
    padding: 4,
  },
  contenidoContainer: {
    height: 590,
    margin: 5,
    marginBottom: 10,
  },
  scrollViewContenido: {
    gap: 15,
    paddingBottom: 70,
  },
  logoutButton: {
    height: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});
