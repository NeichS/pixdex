import { TouchableOpacity,  Text, View } from "react-native";
import { Image } from "expo-image";
import { ROUTES } from "@/src/navigation/routes";
import { router } from "expo-router";
import {  ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";
import { Tag } from "./Tag";

export function TarjetaProducto({detail}: { detail: ContenidoAudiovisualMapped }) {
  const { id, imageUrl, nombre, generos } = detail;
  const handlePress = (id : string) => () => {
    router.push(`${ROUTES.DETAIL}${id}`);
  }
    
  return (
    <TouchableOpacity 
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
              <Tag key={index} index={index} text={cat.nombre}/>
            ))}
          </View>
      </View>
    </TouchableOpacity> 
  ) 
}