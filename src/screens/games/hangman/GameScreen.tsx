import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
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

  const { getPlayerName } = useContext(ContextoPlayerName);
  const playerName = getPlayerName();

  const MAX_LIVES = 5;

  const { getAllContenido } = useContext(ContextoContenidos);

  // Estados para manejar el contenido restante y el contenido actual
  const [contenidoRestante, setContenidoRestante] = useState<
    ContenidoAudiovisualMapped[]
  >([]);
  const [randomContenido, setRandomContenido] =
    useState<ContenidoAudiovisualMapped | null>(null);
  const [underscores, setUnderscores] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [score, setScore] = useState<number>(0);
  const [gameOverScore, setGameOverScore] = useState<number>(0);

  const [vidas, setVidas] = useState(MAX_LIVES);
  const [gameInitialized, setGameInitialized] = useState(false);

  useEffect(() => {
    const contenidos = getAllContenido();

    if (contenidos && contenidos.length > 0 && !gameInitialized) {
      setContenidoRestante(contenidos);

      const initialContenido = getRandomizedContenido(contenidos);

      setRandomContenido(initialContenido);
      setUnderscores(generateUnderscores(initialContenido.nombre));
      setGameInitialized(true);
    }
  }, [getAllContenido, gameInitialized]);

  // Función para pasar al siguiente contenido
  const nextContent = () => {
    if (!randomContenido) return;

    // Remover el contenido actual del contenido restante
    const newContenidoRestante = contenidoRestante.filter(
      (contenido) => contenido.nombre !== randomContenido.nombre
    );

    setContenidoRestante(newContenidoRestante);

    if (newContenidoRestante.length === 0) {
      alert("Congratulations! You've guessed all titles!");
      router.push(ROUTES.HANGMAN);
      return;
    }

    const newRandomContenido = getRandomizedContenido(newContenidoRestante);
    setRandomContenido(newRandomContenido);
    setUnderscores(generateUnderscores(newRandomContenido.nombre));
    setGuessedLetters([]);
  };

  // Función para reiniciar el juego (game over)
  const resetGame = () => {
    const contenidos = getAllContenido();
    setContenidoRestante(contenidos);
    const newRandomContenido = getRandomizedContenido(contenidos);
    setRandomContenido(newRandomContenido);
    setUnderscores(generateUnderscores(newRandomContenido.nombre));
    setVidas(MAX_LIVES);
    setGuessedLetters([]);
    setScore(0);
  };

  const triggerGameOver = () => {
    setGameOverScore(score); 
    setGameOverModal(true); 
 
    const contenidos = getAllContenido();
    setContenidoRestante(contenidos);
    const newRandom = getRandomizedContenido(contenidos);
    setRandomContenido(newRandom);
    setUnderscores(generateUnderscores(newRandom.nombre));
    setVidas(MAX_LIVES);
    setGuessedLetters([]);
    setScore(0);
  };

  const handleLetterGuess = (letter: string) => {
    if (!randomContenido) return;

    if (randomContenido.nombre.toUpperCase().includes(letter)) {
      const updatedUnderscores = underscores.map((char, index) => {
        if (randomContenido.nombre[index].toUpperCase() === letter) {
          return randomContenido.nombre[index];
        }
        return char;
      });

      setUnderscores(updatedUnderscores);
      setGuessedLetters((prev) => [...prev, letter]);

      // Verificar si se ha adivinado todo el título
      if (!updatedUnderscores.includes("_")) {
        alert("Correct! You guessed the title!");
        setScore((prev) => prev + 1);
        nextContent(); // Usar la función para pasar al siguiente
      }

      onCloseModalLetter();
    } else {
      setVidas((v) => v - 1);

      if (vidas === 1) {
        triggerGameOver();
        onCloseModalLetter();
      } else {
        alert(`Incorrect guess! You have ${vidas - 1} lives left.`);
      }
    }
  };

  const handleTitleGuess = (title: string) => {
    if (!randomContenido) return;

    if (title.toUpperCase() === randomContenido.nombre.toUpperCase()) {
      alert("Correct! You guessed the title!");
      setScore((prev) => prev + 1);
      nextContent(); // Usar la función para pasar al siguiente
    } else {
      setVidas((v) => v - 1);
      if (vidas === 1) {
        triggerGameOver();
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
            score={gameOverScore}
          />
        </View>

        {/* imagen de la obra en flex 1 */}
        <View accessibilityLabel="image" style={styles.imageContainer}>
          {randomContenido && (
            <Image
              source={{ uri: randomContenido.imageUrl }}
              style={styles.image}
              contentFit="contain"
              accessibilityLabel="Imagen de la obra a adivinar"
            />
          )}
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
