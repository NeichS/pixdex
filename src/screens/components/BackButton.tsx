import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextPressStart2P } from "./TextPressStart2P";

export function BackButton() {
  const handleBackToHome = () => {
    router.back();
  };

  return (
    <TouchableOpacity
      onPress={handleBackToHome}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6E59A5",
        padding: 5,
        borderWidth: 1,
        borderLeftColor: "#9B87F5",
        borderTopColor: "#9B87F5",
        width: 100,
        gap: 4,
      }}
    >
      <View>
        <Ionicons
          name="arrow-back"
          size={20}
          color="black"
          style={{ color: "white" }}
        />
      </View>
      <View>
        <TextPressStart2P
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          BACK
        </TextPressStart2P>
      </View>
    </TouchableOpacity>
  );
}
