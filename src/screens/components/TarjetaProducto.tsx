import { Pressable,  Text, View } from "react-native";
import { Image } from "expo-image";
import { ROUTES } from "@/src/navigation/routes";
import { router } from "expo-router";
import { ContenidoAudiovisual, ContenidoAudiovisualMapped, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";

export function TarjetaProducto({detail}: { detail: ContenidoAudiovisualMapped }) {
  const { id, imageUrl, nombre, generos } = detail;
  const handlePress = (id : string) => () => {
    router.push(`${ROUTES.DETAIL}${id}`);
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