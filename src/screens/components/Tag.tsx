import { Text, StyleSheet } from "react-native";

export function Tag({index, text} : {index: number, text: string}) {
  return (
    <Text key={index} style={styles.tag}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  tag : {
    backgroundColor: "#403E43",
        color: "white",
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
  }
})
