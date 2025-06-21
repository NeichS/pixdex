import { Modal, Text, View, StyleSheet } from "react-native";

interface PropsModal {
  visible: boolean;
  onClose: () => void;
}

export function NameModal({ visible, onClose }: PropsModal) {
  return (
    <Modal
      animationType="slide"
      backdropColor = "rgba(0,0,0,0.25)"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={ styles.modalContent}>
            
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
    modalContent: {
        width: "100%",
        height: 60,
        backgroundColor: "#1A1F2C",
        borderBottomWidth: 1,
        borderBottomColor: "#403E43",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
});
