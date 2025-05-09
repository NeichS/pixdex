import { Pressable, ScrollView, Text, View } from "react-native";
import * as Font from "expo-font";
import { CajaJuego } from "./components/CajaJuego";
import { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getGeneroPorId, IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { Generos } from "./components/Generos";
import { getTipoPorId, ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { ContenidoAudiovisual, ContenidoAudiovisualMapped, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";


const series : ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 1));
const pelis : ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 2));
const animes : ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 3));

export function HomeScreen() {

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({ PressStart: require("@/assets/fonts/PressStart2P-Regular.ttf") })
      .then(() => setLoaded(true));
  }, []);
  if (!loaded) return null; 

  return (
    <View style={{ flex: 1, backgroundColor: "#1A1F2C", padding : 1, gap: 5 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", margin : 4 , padding:4}}>
        <Text style={{ color: "#6E59A5", fontSize: 24, fontWeight: 500, fontFamily: "PressStart" }}>
          Pixdex
        </Text>

        <View style={{ backgroundColor: "#6E59A5", padding : 5, borderWidth:1, borderLeftColor:"#9B87F5", borderTopColor:"#9B87F5", width: 160 }}>
          <Pressable>
            <View style={{ flexDirection: "row", justifyContent: "center" ,alignItems: "center", gap: 8 }}>
            <View>
            <Ionicons name="filter" size={20} color="black" style={{color:"white"}} />
            </View>
            <View>
            <Text style={{color: "white", textAlign:"center", fontFamily :"PressStart", fontSize:12}}>
              FILTRAR
            </Text>
            </View>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection : "row", gap: 4, margin : 2, padding: 4}}>
        <CajaJuego title="Desafio del ahorcado" description="Adivina los títulos letra por letra ¿Cuántos puedes identificar?" bgColor="#6E59A5"/>
        <CajaJuego title="Pixel reveal" description="Identifica títulos desde imagenes pixeladas. ¡Pon a prueba tu memoria visual!" bgColor="#5FD068"/>
      </View>

      <View style={{height: 590, margin : 5}}>
        <ScrollView contentContainerStyle={{gap:15}}>
          <Generos lista={series} generoTitulo="Series"/>
          <Generos lista={animes} generoTitulo="Animes"/> 
          <Generos lista={pelis} generoTitulo="Peliculas"/> 
        </ScrollView>
      </View>
    </View>
  );
}

function mapContenidoAudiovisual(contenido : ContenidoAudiovisual[]) : ContenidoAudiovisualMapped[]{
  
  const contenidoAudiovisualMapeado : ContenidoAudiovisualMapped[] =
  contenido.map((contenido) => {
    const tipo : ITipoContenidoAudiovisual = getTipoPorId(contenido.tipoId);
    let temp : IGeneroContenidoAudiovisual[] = [];
    contenido.generos.forEach(generoId => {
      temp.push(getGeneroPorId(generoId));
    });
    const generos : IGeneroContenidoAudiovisual[] = temp;

    return {
      id: contenido.id,
      nombre: contenido.nombre,
      descripcion: contenido.descripcion,
      generos: generos,
      tipo: tipo,
      imageUrl: contenido.imageUrl,
    } as ContenidoAudiovisualMapped;
  })

  return contenidoAudiovisualMapeado; 
}