import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { TextPressStart2P } from "./TextPressStart2P";

export function CajaJuego({
  title,
  description,
  bgColor,
}: {
  title: string;
  description: string;
  bgColor: string;
}) {
  return (
    <View style={[styles.cajaJuego, { backgroundColor: bgColor }]}>
      <TouchableOpacity>
        <TextPressStart2P style={styles.title} accessibilityLabel="title">
          {title}
        </TextPressStart2P>
        <Text style={styles.description}>{description}</Text>
        <TextPressStart2P style={styles.jugar}>Jugar</TextPressStart2P>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cajaJuego: {
    borderWidth: 4,
    borderColor: "#403E43",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    padding: 10,
    gap: 4,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
  description: {
    fontSize: 12,
    color: "white",
  },
  jugar: {
    fontSize: 12,
    color: "white",
    alignSelf: "flex-end",
  },
});
