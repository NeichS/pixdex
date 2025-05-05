import { Text, View, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { ContenidoAudiovisual, ContenidoAudiovisualMapped, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { getGeneroPorId, IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { getTipoPorId } from "@/src/data/tiposContenidoAudiovisual";


export default function Detail() {    
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const contenido : ContenidoAudiovisual = contenidosAudiovisuales.find((item) => item.id.toString() === slug) || {id : 0, nombre : "", descripcion: "", generos: [],tipoId: 0, imageUrl : ""};

  let temp : IGeneroContenidoAudiovisual[] = [];
      contenido.generos.forEach(generoId => {
        temp.push(getGeneroPorId(generoId));
      });
      const generos : IGeneroContenidoAudiovisual[] = temp;
      
  const contenidoMapped : ContenidoAudiovisualMapped = {
      id: contenido.id,
      nombre: contenido.nombre,
      descripcion: contenido.descripcion,
      generos: generos,
      tipo: getTipoPorId(contenido.tipoId),
      imageUrl: contenido.imageUrl
  } as ContenidoAudiovisualMapped

  const handleBackToHome = () => {
    router.push("/");
  }

  return (
    <View style={{flex :1, backgroundColor : "#1A1F2C", padding: 10, gap : 20}}>
        <View style={{ backgroundColor: "#6E59A5", padding : 5, borderWidth:1, borderLeftColor:"#9B87F5", borderTopColor:"#9B87F5", width: 100 }}>
          <Pressable onPress={handleBackToHome}>
            <Text style={{color: "white", textAlign:"center", fontFamily :"PressStart", fontSize:12}}>
              BACK
            </Text>
          </Pressable>
        </View>
      <View style={{flex: 1, borderWidth: 4, borderColor: "#403E43", padding : 15, flexDirection: "column", gap: 10, justifyContent: "space-between"}}>
        <View style={{ height: "70%", width : "auto"}} accessibilityLabel="image">
                <Image
                  source={{ uri: contenido.imageUrl }}
                  style={{ width: "100%", height: "100%"}}
                  accessibilityLabel="Imagen del producto"
                />
        </View>
        <Text style={{ color: "#6E59A5", fontFamily: "PressStart", fontSize: 20 }}>{contenidoMapped.nombre}</Text>
        <View style={{backgroundColor: "#403E43", alignSelf : "flex-start", paddingVertical : 5, paddingHorizontal: 10}}><Text style={{color : "white"}}>Tv</Text></View>
        <Text style={{color : "white"}}>{contenidoMapped.descripcion}</Text>
        <Text style={{ color: "#5FD068", fontFamily: "PressStart", fontSize : 14 }}>Genres</Text>
        <View style={{flexDirection : "row", gap : 5}}>
          {contenidoMapped.generos.map((cat, index) => (
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
    </View>
  );
}
