import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextPressStart2P } from "./TextPressStart2P";

interface PropsButton {
  label: string;
  action: () => void;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  background?: string;
  iconColor?: string;
  disabled?: boolean;
}

export function Button({
  label,
  action,
  iconName,
  background = "#6E59A5",
  iconColor = "white",
  disabled = false,
}: PropsButton) {
  // Selecciona el estilo de fondo: si está deshabilitado, ignora el color de background
  const backgroundStyle = disabled
    ? styles.buttonDisabledBackground
    : { backgroundColor: background };

  return (
    <TouchableOpacity
      onPress={action}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}         // sin “feedback” cuando disabled
      style={[
        styles.button,
        backgroundStyle,
        disabled && styles.buttonDisabledOpacity  // baja opacidad
      ]}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          color={disabled ? "#888" : iconColor}  // icono gris si disabled
          size={20}
        />
      )}
      <View>
        <TextPressStart2P style={styles.buttonText}>
          {label}
        </TextPressStart2P>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderLeftColor: "#9B87F5",
    borderTopColor: "#9B87F5",
    gap: 8,
  },
  // Este fondo se usará cuando disabled=true
  buttonDisabledBackground: {
    backgroundColor: "#403E43",
    borderColor: "#2e2b33",
  },
  // Baja la opacidad general del botón
  buttonDisabledOpacity: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
  },
});
