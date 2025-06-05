import { ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";
import { View, StyleSheet } from "react-native";
import { Generos } from "./Generos";
import { useContext } from "react";
import { ContextoContenidos } from "@/src/context/Contenidos";

export function Contenido() {
  const { getAllContenido, getAllTipos } = useContext(ContextoContenidos);

  return (
    <View style={styles.container}>
      {
      getAllTipos().map((tipo) => {
        const contenido: ContenidoAudiovisualMapped[] =
          getAllContenido().filter((c) => c.tipo.id === tipo.id);
        return (
          <Generos
            key={tipo.id}
            lista={contenido}
            generoTitulo={tipo.plural.toUpperCase()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});
