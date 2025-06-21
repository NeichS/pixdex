import { DetailScreen } from "@/src/screens/DetailScreen";
import ContextoContenidosProvider from "@/src/context/Contenidos";

export default function Detail() {
  return (
    <ContextoContenidosProvider>
      <DetailScreen />
    </ContextoContenidosProvider>
  );
}