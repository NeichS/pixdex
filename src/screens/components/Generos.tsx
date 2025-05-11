import { FlatList, Text, View } from "react-native";
import { TarjetaProducto } from "./TarjetaProducto";
import { ContenidoAudiovisualMapped } from "@/src/data/contenidosAudiovisuales";

export function Generos({lista, generoTitulo} :{lista : ContenidoAudiovisualMapped[], generoTitulo : string}) {
  return (
    <View>
      <View
        style={{
          borderWidth: 4,
          borderColor: "#403E43",
          marginTop: 10,
          marginHorizontal: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "#6E59A5",
            marginTop: -10,
            marginLeft: 10,
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "#9B87F5",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              margin: 4,
              fontFamily: "PressStart",
            }}
          >
            {generoTitulo}
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ gap: 8, margin: 10 }}
          data={lista}
          horizontal // habilita scroll horizontal
          keyExtractor={(item) => item.id.toString()} // cada item debe tener key única
          renderItem={({ item }) => <TarjetaProducto detail={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
