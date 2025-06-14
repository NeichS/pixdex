import { HomeScreen } from "../src/screens/HomeScreen";
import ContextoContenidosProvider  from "@/src/context/Contenidos";
import ContextoFilterProvider from "@/src/context/Filter";

export default function App() {
  return (
    <ContextoContenidosProvider>
      <ContextoFilterProvider>
        <HomeScreen />
      </ContextoFilterProvider>
    </ContextoContenidosProvider>
  )
}