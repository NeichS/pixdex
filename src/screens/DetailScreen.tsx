import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { Button } from "./components/Button";
import {
  ContenidoAudiovisual,
  ContenidoAudiovisualMapped,
  contenidosAudiovisuales,
} from "@/src/data/contenidosAudiovisuales";
import {
  getGeneroPorId,
  IGeneroContenidoAudiovisual,
} from "@/src/data/generosContenidoAudiovisual";
import { getTipoPorId } from "@/src/data/tiposContenidoAudiovisual";
import { Tag } from "./components/Tag";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextPressStart2P } from "./components/TextPressStart2P";
import { ListaGeneros } from "./components/ListaGeneros";

export function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const contenido: ContenidoAudiovisual = contenidosAudiovisuales.find(
    (item) => item.id.toString() === id
  ) || {
    id: 0,
    nombre: "",
    descripcion: "",
    generos: [],
    tipoId: 0,
    imageUrl: "",
  };

  let temp: IGeneroContenidoAudiovisual[] = [];
  contenido.generos.forEach((generoId) => {
    temp.push(getGeneroPorId(generoId));
  });
  const generos: IGeneroContenidoAudiovisual[] = temp;

  const contenidoMapped: ContenidoAudiovisualMapped = {
    id: contenido.id,
    nombre: contenido.nombre,
    descripcion: contenido.descripcion,
    generos: generos,
    tipo: getTipoPorId(contenido.tipoId),
    imageUrl: contenido.imageUrl,
  } as ContenidoAudiovisualMapped;

  const handleBackToHome = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.mainContainer}>
      <View style={{ width: 100 }}>
        <Button label="BACK" action={handleBackToHome} iconName="arrow-back" />
      </View>
      <View style={styles.card}>
        <View
          style={{ height: "70%", width: "auto" }}
          accessibilityLabel="image"
        >
          <Image
            source={{ uri: contenido.imageUrl }}
            style={{ width: "100%", height: "100%" }}
            accessibilityLabel="Imagen del producto"
          />
        </View>
        <TextPressStart2P style={styles.h1}>
          {contenidoMapped.nombre}
        </TextPressStart2P>
        <View style={styles.tag}>
          <Tag key={1} index={1} text="Tv" />
        </View>
        <Text style={{ color: "white" }}>{contenidoMapped.descripcion}</Text>
        <TextPressStart2P style={styles.h2}>
          Genres
        </TextPressStart2P>
        <ListaGeneros generos={contenidoMapped.generos}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    padding: 10,
    gap: 20,
  },
  card: {
    flex: 1,
    borderWidth: 4,
    borderColor: "#403E43",
    padding: 15,
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
  },
  h1: {
    color: "#6E59A5",
    fontSize: 20,
  },
  tag: {
    backgroundColor: "#403E43",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginTop: -20,
  },
  h2: {
    color: "#5FD068", fontSize: 14 
  },
});
