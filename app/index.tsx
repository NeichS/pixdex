import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import * as Font from "expo-font";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { getGeneroPorId, IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { getTipoPorId, ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { ContenidoAudiovisual, ContenidoAudiovisualMapped, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";


const series : ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 1));
const pelis : ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 2));
const animes : ContenidoAudiovisualMapped[] = mapContenidoAudiovisual(contenidosAudiovisuales.filter((contenido) => contenido.tipoId === 3));

export default function Index() {

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

        <View style={{ backgroundColor: "#6E59A5", padding : 5, borderWidth:1, borderLeftColor:"#9B87F5", borderTopColor:"#9B87F5", width: 100 }}>
          <Pressable>
            <Text style={{color: "white", textAlign:"center", fontFamily :"PressStart", fontSize:12}}>
              FILTRAR
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection : "row", gap: 4, margin : 2, padding: 4}}>
        <CajaJuego title="Desafio del ahorcado" description="Adivina los títulos letra por letra ¿Cuántos puedes identificar?" bgColor="#6E59A5"/>
        <CajaJuego title="Pixel reveal" description="Identifica títulos desde imagenes pixeladas. ¡Pon a prueba tu memoria visual!" bgColor="#5FD068"/>
      </View>

      <View style={{height: 590, margin : 5}}>
        <ScrollView contentContainerStyle={{gap:15}}>
          <View style={{borderWidth: 4, borderColor:"#403E43", marginTop: 10, marginHorizontal: 5}}>
          <View style={{backgroundColor: "#6E59A5", marginTop: -10, marginLeft:10,alignSelf: "flex-start", borderWidth: 1 ,borderColor: "#9B87F5"}}>
            <Text style={{color: "white", fontSize: 12, margin : 4, fontFamily:"PressStart"}}>
              Series
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{ gap: 8, margin : 10 }}
            data={series}
            horizontal                          // habilita scroll horizontal
            keyExtractor={(item) => item.id.toString()}   // cada item debe tener key única
            renderItem={({ item }) => (
              <TarjetaProducto
                detail={item}
              />
            )}
            showsHorizontalScrollIndicator={false}
            />
        </View>
        <View style={{borderWidth: 4, borderColor:"#403E43", marginHorizontal: 5}}>
          <View style={{backgroundColor: "#6E59A5", marginTop: -10, marginLeft:10,alignSelf: "flex-start", borderWidth: 1 ,borderColor: "#9B87F5"}}>
            <Text style={{color: "white", fontSize: 12, fontFamily:"PressStart", margin : 4}}>
              Peliculas
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{ gap: 8, margin : 10 }}
            data={pelis}
            horizontal                          // habilita scroll horizontal
            keyExtractor={(item) => item.id.toString()}   // cada item debe tener key única
            renderItem={({ item }) => (
              <TarjetaProducto
                detail={item}
              />
            )}
            showsHorizontalScrollIndicator={false}
            />
        </View>
        <View style={{borderWidth: 4, borderColor:"#403E43", marginHorizontal: 5, marginBottom:50}}>
          <View style={{backgroundColor: "#6E59A5", marginTop: -10, marginLeft:10,alignSelf: "flex-start", borderWidth: 1 ,borderColor: "#9B87F5"}}>
            <Text style={{color: "white", fontSize: 12, fontFamily:"PressStart", margin : 4}}>
              Animes
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{ gap: 8, margin : 10 }}
            data={animes}
            horizontal                          // habilita scroll horizontal
            keyExtractor={(item) => item.id.toString()}   // cada item debe tener key única
            renderItem={({ item }) => (
              <TarjetaProducto
                detail={item}
              />
            )}
            showsHorizontalScrollIndicator={false}
            />
        </View>
        </ScrollView>
      </View>
    </View>
  );
}


function CajaJuego({ title, description, bgColor }: { title: string; description: string; bgColor: string }) {
  return (
    <View style={{borderWidth: 4, borderColor: "#403E43", backgroundColor:bgColor,flexDirection: "column",justifyContent: "space-between", flex : 1, padding:10, gap: 4}}>
      <Pressable>
      <Text style={{color: "white", fontSize: 16, fontWeight: 500, fontFamily:"PressStart"}} accessibilityLabel="title">{title}</Text>
      <Text style={{fontSize: 12, color : "white"}}>{description}</Text>
      <Text style={{fontSize: 12, color: "white", alignSelf: "flex-end", fontFamily:"PressStart"}}>Jugar</Text>
      </Pressable>
    </View>
  );
}

function TarjetaProducto({detail}: { detail: ContenidoAudiovisualMapped }) {
  const { id, imageUrl, nombre, generos } = detail;
  const handlePress = (id : string) => () => {
    router.push(`/detail/${id}`);
  }
    
  return (
    <Pressable 
    onPress={handlePress(id.toString())}
    style={{flexDirection : "column", borderWidth : 2, borderBottomColor: "#8E9196", borderRightColor: "#8E9196", paddingBottom: 8, width : 150, gap : 2}}>
      <View  accessibilityLabel="image">
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 145, height: 200 }}
        accessibilityLabel="Imagen del producto"
      />
      </View>
      <View style={{padding:5, gap : 2}}>
      <Text style={{color : "white", fontSize: 10, margin: 5, fontFamily:"PressStart"}}>{nombre}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, maxWidth: 150 }}>
            {generos.map((cat, index) => (
              <Text
                key={index}                            // cada elemento debe tener una key única
                style={{
                  backgroundColor: "#403E43",
                  color: "white",
                  fontSize: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                {cat.nombre}
              </Text>
            ))}
          </View>
      </View>
    </Pressable> 
  ) 
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