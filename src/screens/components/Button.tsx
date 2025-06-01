import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextPressStart2P } from "./TextPressStart2P";

export function Button({
  label,
  action,
  iconName,
}: {
  label: string;
  action: () => void;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
}) {
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
        <Ionicons name={iconName} color={"white"} size={20} />
        <View>
          <TextPressStart2P style={styles.buttonText}>{label}</TextPressStart2P>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6E59A5",
    padding: 5,
    borderWidth: 1,
    borderLeftColor: "#9B87F5",
    borderTopColor: "#9B87F5",
    gap: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
  },
});
