import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { ContextoPlayerName } from "@/src/context/PlayerName";
import { ContextoContenidos } from "@/src/context/Contenidos";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "@/src/screens/components/Button";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GuessLetterModal } from "./components/GuessLetterModal";
import { GuessTitleModal } from "./components/GuessTitleModal";
import { ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";
import { Image } from "expo-image";

export function Game() {
  const { getPlayerName } = useContext(ContextoPlayerName);

  const playerName = getPlayerName();

  const handleBackToHome = () => {
    router.back();
  };

  const [modalLetter, setModallLetter] = useState(false);
  const openModalLetter = () => {
    setModallLetter(true);
  };

  const onCloseModalLetter = () => {
    setModallLetter(false);
  };

  const [modalTitle, setModalTitle] = useState(false);
  const openModalTitle = () => {
    setModalTitle(true);
  };

  const onCloseModalTitle = () => {
    setModalTitle(false);
  };
  const { getAllContenido } = useContext(ContextoContenidos);
  let contenidoRestante = getAllContenido();

  const getRandomizedContenido = (contenido: ContenidoAudiovisualMapped[]) => {
    const randomIndex = Math.floor(Math.random() * contenido.length);
    const randomContenido: ContenidoAudiovisualMapped = contenido[randomIndex];
    console.log("Random Contenido: ", randomContenido);
    return randomContenido;
  };

  const [randomContenido, setRandomContenido] =
    useState<ContenidoAudiovisualMapped>(() =>
      getRandomizedContenido(contenidoRestante)
    );

  let titleChars: string[] = randomContenido.nombre.split("");
  const underscores = titleChars.map((c) => (c === " " ? " " : "_")).join(" ");

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="EXIT" action={handleBackToHome} iconName="arrow-back" />
        <View style={styles.gameStatus}>
          <View style={styles.hearts}>
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
            <AntDesign name="heart" size={24} color="#6E59A5" />
          </View>
          <Text style={styles.info}>Player : {playerName} </Text>
          <Text style={styles.info}>Score : 0</Text>
        </View>
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.actionButtons}>
          <Button label="GUESS TITLE" action={openModalTitle} />
          <GuessTitleModal visible={modalTitle} onClose={onCloseModalTitle} />
          <Button label="GUESS LETTER" action={openModalLetter} />
          <GuessLetterModal
            visible={modalLetter}
            onClose={onCloseModalLetter}
          />
        </View>

        {/* imagen de la obra en flex 1 */}
        <View accessibilityLabel="image" style={styles.imageContainer}>
          <Image
            source={{ uri: randomContenido.imageUrl }}
            style={styles.image}
            accessibilityLabel="Imagen de la obra a adivinar"
          />
        </View>
        <View style={styles.lettersContainer}>
          <Text
            style={styles.underscores}
            numberOfLines={1} // una sola línea
            adjustsFontSizeToFit // activa el auto-shrink
            minimumFontScale={0.5} // hasta la mitad del tamaño original
          >
            {underscores}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    padding: 10,
    gap: 10,
  },
  topContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  gameStatus: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  hearts: {
    flexDirection: "row",
    gap: 4,
  },
  info: {
    color: "white",
    textAlign: "right",
    alignSelf: "flex-end",
  },
  gameContainer: {
    flex: 1,
    borderColor: "#403E43",
    borderWidth: 2,
    padding: 10,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 4,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  lettersContainer: {
    width: "100%",
    height: "10%",
    backgroundColor: "#403E43",
    justifyContent: "center",
    alignItems: "center",
  },
  underscores: {
    color: "#FFF",
    fontSize: 24,       // tamaño “base” máximo
  },
});
