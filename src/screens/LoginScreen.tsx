import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, TextInput } from "react-native";
import { supabase } from "../lib/supabase";
import { Button } from "./components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextPressStart2P } from "./components/TextPressStart2P";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <SafeAreaView edges={["bottom", "top"]} style={styles.container}>
      <TextPressStart2P style={styles.title}>
        WELCOME TO PIXDEX
      </TextPressStart2P>
      <View style={styles.inputsContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
          placeholder="email@address.com"
          placeholderTextColor="#8E9196"
          autoCapitalize={"none"}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#8E9196"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          label="SIGN UP"
          disabled={loading}
          action={() => signUpWithEmail()}
          background="#5FD068"
        />
        <Button
          label="SIGN IN"
          disabled={loading}
          action={() => signInWithEmail()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1F2C",
    padding: 12,
    flex: 1,
    justifyContent: "center",
  },
  title : {
    color: "#6E59A5",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  inputsContainer: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    borderColor: "#6E59A5",
    borderWidth: 1,
    height: 40,
    color: "#FFFFFF",
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
});
