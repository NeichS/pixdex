import { Text } from "react-native";

export function Tag({index, text} : {index: number, text: string}) {
  return (
    <Text // cada elemento debe tener una key única
      key={index}
      style={{
        backgroundColor: "#403E43",
        color: "white",
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
      }}
    >
      {text}
    </Text>
  );
}
