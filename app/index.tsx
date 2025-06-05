import { HomeScreen } from "../src/screens/HomeScreen";
import ContextoContenidosProvider  from "@/src/context/Contenidos";

export default function App() {
  return (
    <ContextoContenidosProvider>
      <HomeScreen />
    </ContextoContenidosProvider>
  )
}