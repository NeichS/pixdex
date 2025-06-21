import { HomeScreen } from "../src/screens/HomeScreen";
import ContextoContenidosProvider from "@/src/context/Contenidos";
import ContextoFilterProvider from "@/src/context/Filter";
import ContextoPlayerNameProvider from "@/src/context/PlayerName";

export default function App() {
  return (
    <ContextoContenidosProvider>
      <ContextoFilterProvider>
        <ContextoPlayerNameProvider>
          <HomeScreen />
        </ContextoPlayerNameProvider>
      </ContextoFilterProvider>
    </ContextoContenidosProvider>
  );
}
