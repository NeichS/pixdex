import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { View, StyleSheet } from "react-native";
import { Tag } from "./Tag";

export function ListaGeneros({
  generos,
}: {
  generos: IGeneroContenidoAudiovisual[];
}) {
  return (
    <View style={styles.listaGeneros}>
      {generos.map((cat, index) => (
        <Tag key={index} index={index} text={cat.nombre} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listaGeneros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    maxWidth: 150,
  },
});
