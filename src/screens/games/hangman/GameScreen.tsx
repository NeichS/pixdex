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
import {
  generateUnderscores,
  getRandomizedContenido,
} from "./utils/hangmanUtils";
import { ROUTES } from "@/src/navigation/routes";
import { GameOverModal } from "./components/GameOverModal";

export function Game() {
  const handleBackToHome = () => {
    router.back();
  };

  const { getPlayerName } = useContext(ContextoPlayerName);
  const playerName = getPlayerName();

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

  const [gameOverModal, setGameOverModal] = useState(false);
  const onCloseGameOverModal = () => {
    setGameOverModal(false);
  };

  const openGameOverModal = () => {
    setGameOverModal(true);
  };

  const { getAllContenido } = useContext(ContextoContenidos);
  let contenidoRestante = getAllContenido();

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [randomContenido, setRandomContenido] =
    useState<ContenidoAudiovisualMapped>(() =>
      getRandomizedContenido(contenidoRestante)
    );

  const [underscores, setUnderscores] = useState<string[]>(
    generateUnderscores(randomContenido.nombre)
  );

  const MAX_LIVES = 5;
  const [vidas, setVidas] = useState(5);

  const handleLetterGuess = (letter: string) => {
    if (randomContenido.nombre.toUpperCase().includes(letter)) {
      // Actualizar los guiones bajos
      const updatedUnderscores = underscores.map((char, index) => {
        if (randomContenido.nombre[index].toUpperCase() === letter) {
          return randomContenido.nombre[index];
        }
        return char;
      });
      console.log("Correct guess! Updated underscores:", updatedUnderscores);
      setUnderscores(updatedUnderscores);
      setGuessedLetters((prev) => [...prev, letter]);

      // Verificar si se ha adivinado todo el título
      if (!updatedUnderscores.includes("_")) {
        //restar a contenidoRestante el contenido adivinado para evitar duplicados.
        contenidoRestante = contenidoRestante.filter(
          (contenido) => contenido.nombre !== randomContenido.nombre
        );
        setRandomContenido(getRandomizedContenido(contenidoRestante));
        setUnderscores(generateUnderscores(randomContenido.nombre));
        setGuessedLetters([]);
        alert("Correct! You guessed the title!");
        setScore((prev) => prev + 1);

        if (contenidoRestante.length === 0) {
          alert("Congratulations! You've guessed all titles!");
          router.push(ROUTES.HANGMAN);
        }
      }
    } else {
      setVidas((v) => v - 1);

      if (vidas == 1) {
        openGameOverModal();
        setRandomContenido(getRandomizedContenido(contenidoRestante));
        setUnderscores(generateUnderscores(randomContenido.nombre));
        setVidas(5);
        setGuessedLetters([]);
        setScore(0);
        onCloseModalLetter();
      } else {
        alert(`Incorrect guess! You have ${vidas - 1} lives left.`);
      }
    }
  };

  const handleTitleGuess = (title: string) => {
    if (title.toUpperCase() === randomContenido.nombre.toUpperCase()) {
      alert("Correct! You guessed the title!");
      //restar a contenidoRestante el contenido adivinado
      contenidoRestante = contenidoRestante.filter(
        (contenido) => contenido.nombre !== randomContenido.nombre
      );
      setRandomContenido(getRandomizedContenido(contenidoRestante));
      setUnderscores(generateUnderscores(randomContenido.nombre));
      setGuessedLetters([]);

      setScore((prev) => prev + 1);

      if (contenidoRestante.length === 0) {
        alert("Congratulations! You've guessed all titles!");
        router.push(ROUTES.HANGMAN);
      }
    } else {
      setVidas((v) => v - 1);
      if (vidas == 1) {
        openGameOverModal();
        setRandomContenido(getRandomizedContenido(contenidoRestante));
        setUnderscores(generateUnderscores(randomContenido.nombre));
        setVidas(5);
        setGuessedLetters([]);
        setScore(0);
        onCloseModalTitle();
      } else {
        alert(`Incorrect guess! You have ${vidas - 1} lives left.`);
      }
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="EXIT" action={handleBackToHome} iconName="arrow-back" />
        <View style={styles.gameStatus}>
          <View style={styles.hearts}>
            {Array.from({ length: MAX_LIVES }).map((_, idx) => (
              <AntDesign
                key={idx}
                name="heart"
                size={24}
                color={idx < vidas ? "#6E59A5" : "#888888"}
              />
            ))}
          </View>
          <Text style={styles.info}>Player : {playerName} </Text>
          <Text style={styles.info}>Score : {score}</Text>
        </View>
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.actionButtons}>
          <Button label="GUESS TITLE" action={openModalTitle} />
          <GuessTitleModal
            visible={modalTitle}
            onClose={onCloseModalTitle}
            onGuess={handleTitleGuess}
          />
          <Button label="GUESS LETTER" action={openModalLetter} />
          <GuessLetterModal
            visible={modalLetter}
            onClose={onCloseModalLetter}
            onGuess={handleLetterGuess}
            guessedLetters={guessedLetters}
          />
          <GameOverModal
            onClose={onCloseGameOverModal}
            visible={gameOverModal}
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
    fontSize: 24,
    letterSpacing: 4,
  },
});
