import { FlatList, StyleSheet, View } from "react-native";
import { TarjetaProducto } from "./TarjetaProducto";
import { ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";
import { TextPressStart2P } from "./TextPressStart2P";
import { useContext } from "react";
import { ContextoFilter } from "@/src/context/Filter";

interface ContenidoPorTipoProps {
  lista: ContenidoAudiovisualMapped[];
  generoTitulo: string;
}

export function ContenidoPorTipo({ lista, generoTitulo }: ContenidoPorTipoProps) {
  
  const { contenidoFiltered } = useContext(ContextoFilter)
  const listaFiltrada = contenidoFiltered(lista);
  
  if (listaFiltrada.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.generoContainer}>
        <TextPressStart2P style={styles.generoTitulo}>
          {generoTitulo}
        </TextPressStart2P>
      </View>
      <FlatList
        contentContainerStyle={styles.listaProducto}
        data={listaFiltrada}
        horizontal // habilita scroll horizontal
        keyExtractor={(item) => item.id.toString()} // cada item debe tener key única
        renderItem={({ item }) => <TarjetaProducto detail={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: "#403E43",
    marginTop: 10,
    marginHorizontal: 5,
  },
  generoContainer: {
    backgroundColor: "#6E59A5",
    marginTop: -15,
    marginLeft: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#9B87F5",
  },
  generoTitulo: {
    color: "white",
    fontSize: 12,
    margin: 4,
    paddingTop: 4,
  },
  listaProducto: {
    gap: 8,
    margin: 10,
  },
});
