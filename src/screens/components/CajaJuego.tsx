import { TouchableOpacity,  Text, View } from "react-native";

export function CajaJuego({ title, description, bgColor }: { title: string; description: string; bgColor: string }) {
  return (
    <View style={{borderWidth: 4, borderColor: "#403E43", backgroundColor:bgColor,flexDirection: "column",justifyContent: "space-between", flex : 1, padding:10, gap: 4}}>
      <TouchableOpacity>
      <Text style={{color: "white", fontSize: 16, fontWeight: 500, fontFamily:"PressStart"}} accessibilityLabel="title">{title}</Text>
      <Text style={{fontSize: 12, color : "white"}}>{description}</Text>
      <Text style={{fontSize: 12, color: "white", alignSelf: "flex-end", fontFamily:"PressStart"}}>Jugar</Text>
      </TouchableOpacity>
    </View>
  );
}