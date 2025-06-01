import { TouchableOpacity,  Text, View } from "react-native";
import { TextPressStart2P } from "./TextPressStart2P";

export function CajaJuego({ title, description, bgColor }: { title: string; description: string; bgColor: string }) {
  return (
    <View style={{borderWidth: 4, borderColor: "#403E43", backgroundColor:bgColor,flexDirection: "column",justifyContent: "space-between", flex : 1, padding:10, gap: 4}}>
      <TouchableOpacity>
      <TextPressStart2P style={{color: "white", fontSize: 16, fontWeight: 500}} accessibilityLabel="title">{title}</TextPressStart2P>
      <Text style={{fontSize: 12, color : "white"}}>{description}</Text>
      <TextPressStart2P style={{fontSize: 12, color: "white", alignSelf: "flex-end"}}>Jugar</TextPressStart2P>
      </TouchableOpacity>
    </View>
  );
}