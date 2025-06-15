import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextPressStart2P } from "./TextPressStart2P";

interface PropsButton {
  label: string;
  action: () => void;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  background?: string;
  iconColor?: string;
}

export function Button({
  label,
  action,
  iconName,
  background = "#6E59A5",
  iconColor = "white",
}: PropsButton) {
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.button, { backgroundColor: background }]}
    >
      {iconName && <Ionicons name={iconName} color={iconColor} size={20} />}
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
