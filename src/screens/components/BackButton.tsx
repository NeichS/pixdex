import { Text, View, TouchableOpacity } from "react-native";
import { router} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export function BackButton(){

      const handleBackToHome = () => {
    router.back();
  }

    return(
          <TouchableOpacity onPress={handleBackToHome} style={{flexDirection : "row", justifyContent: "center", alignItems: "center",backgroundColor: "#6E59A5", padding : 5, borderWidth:1, borderLeftColor:"#9B87F5", borderTopColor:"#9B87F5", width: 100, gap: 4}}>
            <View>
            <Ionicons name="arrow-back" size={20} color="black" style={{color: "white"}}/>
            </View>
            <View>
            <Text style={{color: "white", textAlign:"center", fontFamily :"PressStart", fontSize:12, marginTop: 5}}>
              BACK
            </Text>
            </View>
          </TouchableOpacity>
    )
}