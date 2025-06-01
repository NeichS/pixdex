import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import * as Font from "expo-font";
import { CajaJuego } from "./components/CajaJuego";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import * as NavigationBar from 'expo-navigation-bar';
import { TextPressStart2P } from "./components/TextPressStart2P";

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
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
      NavigationBar.setBackgroundColorAsync('transparent');
    }
  }, []);
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#1A1F2C", gap: 5, paddingBottom: 20 }}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 4,
          padding: 4,
        }}
      >
        <TextPressStart2P
          style={{
            color: "#6E59A5",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          Pixdex
        </TextPressStart2P>

        <View
          style={{
            backgroundColor: "#6E59A5",
            padding: 5,
            borderWidth: 1,
            borderLeftColor: "#9B87F5",
            borderTopColor: "#9B87F5",
            width: 160,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <View>
                <Ionicons
                  name="filter"
                  size={20}
                  color="black"
                  style={{ color: "white" }}
                />
              </View>
              <View>
                <TextPressStart2P
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  FILTRAR
                </TextPressStart2P>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
