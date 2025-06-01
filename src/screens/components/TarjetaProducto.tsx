import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ROUTES } from "@/src/navigation/routes";
import { router } from "expo-router";
import { ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";
import { Tag } from "./Tag";
import { TextPressStart2P } from "./TextPressStart2P";
import { ListaGeneros } from "./ListaGeneros";

export function TarjetaProducto({
  detail,
}: {
  detail: ContenidoAudiovisualMapped;
}) {
  const { id, imageUrl, nombre, generos } = detail;
  const handlePress = (id: string) => () => {
    router.push(`${ROUTES.DETAIL}${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress(id.toString())}
      style={styles.container}
    >
      <View accessibilityLabel="image">
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          accessibilityLabel="Imagen del producto"
        />
      </View>
      <View style={{ padding: 5, gap: 2 }}>
        <TextPressStart2P style={styles.name} accessibilityLabel="nombre">
          {nombre}
        </TextPressStart2P>
        <ListaGeneros generos={generos} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderWidth: 2,
    borderBottomColor: "#8E9196",
    borderRightColor: "#8E9196",
    paddingBottom: 8,
    width: 150,
    gap: 2,
  },
  image : {
    width: 145, height: 200 
  },
  name: {
    color: "white",
    fontSize: 10,
    margin: 5,
  },
});
