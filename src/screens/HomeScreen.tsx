import {
  ScrollView,
  StatusBar,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { CajaJuego } from "./components/CajaJuego";
import { useEffect } from "react";
import {
  getGeneroPorId,
  IGeneroContenidoAudiovisual,
} from "@/src/data/generosContenidoAudiovisual";
import { Generos } from "./components/Generos";
import {
  getTipoPorId,
  ITipoContenidoAudiovisual,
} from "@/src/data/tiposContenidoAudiovisual";
import {
  ContenidoAudiovisual,
  ContenidoAudiovisualMapped,
  contenidosAudiovisuales,
} from "@/src/data/contenidosAudiovisuales";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { TextPressStart2P } from "./components/TextPressStart2P";
import { Button } from "./components/Button";

const series: ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(
  contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 1)
);
const pelis: ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(
  contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 2)
);
const animes: ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(
  contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 3)
);

export function HomeScreen() {
  useEffect(() => {
    // Solo se aplica en Android:
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("light");
      NavigationBar.setBackgroundColorAsync("transparent");
    }
  }, []);

  const handleFilter = () => {
    // Implementar la lógica de filtrado aquí
    console.log("Filtrar contenido");
  };
  return (
    <SafeAreaView edges={["top"]} style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.topContainer}>
        <TextPressStart2P style={styles.h1}>Pixdex</TextPressStart2P>
        <Button label="FILTRAR" action={handleFilter} iconName="filter" />
      </View>
      <View style={{ flexDirection: "row", gap: 4, padding: 4 }}>
        <CajaJuego
          title="Desafio del ahorcado"
          description="Adivina los títulos letra por letra ¿Cuántos puedes identificar?"
          bgColor="#6E59A5"
        />
        <CajaJuego
          title="Pixel reveal"
          description="Identifica títulos desde imagenes pixeladas. ¡Pon a prueba tu memoria visual!"
          bgColor="#5FD068"
        />
      </View>

      <View style={{ height: 590, margin: 5 }}>
        <ScrollView contentContainerStyle={{ gap: 15, paddingBottom: 70 }}>
          <Generos lista={series} generoTitulo="Series" />
          <Generos lista={animes} generoTitulo="Animes" />
          <Generos lista={pelis} generoTitulo="Peliculas" />
        </ScrollView>
      </View>

      <View style={{}}></View>
    </SafeAreaView>
  );
}

function mapContenidoAudiovisual(
  contenido: ContenidoAudiovisual[]
): ContenidoAudiovisualMapped[] {
  const contenidoAudiovisualMapeado: ContenidoAudiovisualMapped[] =
    contenido.map((contenido) => {
      const tipo: ITipoContenidoAudiovisual = getTipoPorId(contenido.tipoId);
      let temp: IGeneroContenidoAudiovisual[] = [];
      contenido.generos.forEach((generoId) => {
        temp.push(getGeneroPorId(generoId));
      });
      const generos: IGeneroContenidoAudiovisual[] = temp;

      return {
        id: contenido.id,
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        generos: generos,
        tipo: tipo,
        imageUrl: contenido.imageUrl,
      } as ContenidoAudiovisualMapped;
    });

  return contenidoAudiovisualMapeado;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    gap: 5,
    paddingBottom: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
    padding: 4,
  },
  h1: {
    color: "#6E59A5",
    fontSize: 24,
    fontWeight: 500,
  },
});
