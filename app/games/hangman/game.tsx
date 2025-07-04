import { Game } from "@/src/screens/games/hangman/GameScreen";
import ContextoContenidosProvider from "@/src/context/Contenidos";
export default function HangmanGame() {
  return (
    <ContextoContenidosProvider>
      <Game />
    </ContextoContenidosProvider>
  );
}
