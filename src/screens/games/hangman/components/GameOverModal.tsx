import { Modal, Text, View, StyleSheet} from "react-native";
import { TextPressStart2P } from "@/src/screens/components/TextPressStart2P";
import { Button } from "@/src/screens/components/Button";
import { ROUTES } from "@/src/navigation/routes";
import { router } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { useEffect } from "react";

interface PropsModal {
  visible: boolean;
  onClose: () => void;
  score: number;
}

export function GameOverModal({ visible, onClose, score }: PropsModal) {
useEffect(() => {
    if (!visible) return;    // sólo actuamos al abrir el modal

    (async () => {
      // 1. Obtener user_id
      const {
        data: { user },
        error: userErr
      } = await supabase.auth.getUser();
      if (userErr || !user) return console.error("Usuario no autenticado", userErr);
      const userId = user.id;

      // 2. Traer la puntuación anterior (si existe)
      const { data: existing, error: selectErr } = await supabase
        .from("hangman_scores")
        .select("score")
        .eq("user_id", userId)
        .single();

      if (selectErr && selectErr.code !== "PGRST116") {
        return console.error("Error al leer score previo", selectErr);
      }
      // 3. Guardar la puntuación si es mejor que la anterior
      if (!existing) {
        const { error: insertErr } = await supabase
          .from("hangman_scores")
          .insert({
            user_id: userId,
            score,
            achieved_at: new Date().toISOString(),
          });
        if (insertErr) console.error("Error INSERT score", insertErr);
      } else if (score > existing.score) {
        // sólo actualizamos si superó el anterior
        const { error: updateErr } = await supabase
          .from("hangman_scores")
          .update({
            score,
            achieved_at: new Date().toISOString(),
          })
          .eq("user_id", userId);
        if (updateErr) console.error("Error UPDATE score", updateErr);
      }
    })();
  }, [visible, score]);

  
  const onClickBackToHome = () => {
    onClose();
    router.push(ROUTES.HOME);
  };

  return (
    <Modal
      animationType="slide"
      backdropColor="rgba(0,0,0,0.25)"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.content}>
          <TextPressStart2P>
            <Text style={styles.title}>Game over!</Text>
          </TextPressStart2P>
          <View style={styles.button}>
            <Button label="TRY AGAIN" action={onClose} />
            <Button label="BACK TO HOME" action={onClickBackToHome} />
          </View>
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
    padding: 5,
  },
  content: {
    width: "100%",
    height: 150,
    flexDirection: "column",
    backgroundColor: "#1A1F2C",
    borderBottomWidth: 1,
    borderBottomColor: "#403E43",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
  input: {
    borderColor: "#6E59A5",
    borderWidth: 1,
    height: 40,
    width: "100%",
    color: "#FFFFFF",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
