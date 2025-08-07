import React, { useState, useContext } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Switch,
  Text,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button } from "./components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextPressStart2P } from "./components/TextPressStart2P";
import { ContextoPlayerName } from "../context/PlayerName";
import { router } from "expo-router";
import { ROUTES } from "../navigation/routes";

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
  const [isSignInMode, setIsSignInMode] = useState(true);
  const { setPlayerNameHandler, getPlayerName } =
    useContext(ContextoPlayerName);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

  async function fetchCurrentUsername(userId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("fetchCurrentUsername error:", error);
      return null;
    }
    return data?.username?.trim() ?? null;
  }

  async function signInWithEmail() {
    setLoading(true);

    const { data: signInData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      Alert.alert(authError.message);
      setLoading(false);
      return;
    }

    const user = signInData.user;
    const username = await fetchCurrentUsername(user.id);

    if (username) {
      setPlayerNameHandler(username);
    } else {
      const metaUsername =
        (user.user_metadata?.username as string | undefined)?.trim() ?? "";
      if (metaUsername) {
        setPlayerNameHandler(metaUsername);
      } else {
        Alert.alert("No se pudo obtener tu username. Intentá nuevamente.");
      }
    }
    setLoading(false);
    navToHome();
  }

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    if (isUsernameAvailable === false) {
      Alert.alert("Error", "El username ya está en uso");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username.trim() },
      },
    });

    if (error) {
      Alert.alert("Error on saving new user" + error.message);
      setLoading(false);
      return;
    }

    Alert.alert("¡Revisa tu correo para verificar tu cuenta!");
    setLoading(false);
  }

  async function isUsernameTaken(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return false;

    setCheckingUsername(true);

    const { data, error, count } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: false })
      .ilike("username", trimmed);

    setCheckingUsername(false);

    if (error) {
      console.error("Error checking username", error);
      return true;
    }

    return (count ?? 0) > 0;
  }

  const navToHome = () => {
    router.push(ROUTES.HOME);
  };
  return (
    <SafeAreaView edges={["bottom", "top"]} style={styles.container}>
      <View style={styles.backToHome}>
        <Button action={navToHome} label="BACK TO HOME" />
      </View>
      <View style={styles.container}>
        <TextPressStart2P style={styles.title}>
          WELCOME TO PIXDEX
        </TextPressStart2P>
        <View style={styles.inputsContainer}>
          {/* SOLO en modo SignUp mostramos username */}
          {!isSignInMode && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#8E9196"
                autoCapitalize="none"
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  setIsUsernameAvailable(null);
                }}
                onBlur={async () => {
                  const taken = await isUsernameTaken(username);
                  if (taken) {
                    setIsUsernameAvailable(false);
                    Alert.alert("Ese username ya está en uso.");
                  } else {
                    setIsUsernameAvailable(true);
                  }
                }}
              />
              {checkingUsername && <ActivityIndicator size="small" />}
              {isUsernameAvailable === false && (
                <Text style={styles.errorText}>Username already in use.</Text>
              )}
              {isUsernameAvailable === true && (
                <Text style={styles.okText}>Username available ✅</Text>
              )}
            </>
          )}
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.input}
            placeholder="email@address.com"
            placeholderTextColor="#8E9196"
            autoCapitalize={"none"}
            autoComplete="email"
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#8E9196"
            autoCapitalize={"none"}
            autoComplete="password"
          />
          {!isSignInMode && (
            <TextInput
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password"
              placeholderTextColor="#8E9196"
              autoCapitalize="none"
              autoComplete="password"
            />
          )}
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>¿Ya tienes cuenta?</Text>
          <Switch value={isSignInMode} onValueChange={setIsSignInMode} />
        </View>
        <View style={styles.buttons}>
          {isSignInMode ? (
            <Button
              label="SIGN IN"
              disabled={loading}
              action={signInWithEmail}
            />
          ) : (
            <Button
              label="SIGN UP"
              disabled={
                loading ||
                checkingUsername ||
                isUsernameAvailable === false ||
                password.length === 0 ||
                confirmPassword.length === 0
              }
              action={signUpWithEmail}
            />
          )}
        </View>
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
  backToHome: {
    width: "50%",
    justifyContent: "flex-start",
  },
  title: {
    color: "#6E59A5",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  switchLabel: {
    color: "#FFFFFF",
    fontSize: 16,
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
  errorText: { color: "#FF6B6B", marginTop: 4 },
  okText: { color: "#5FD068", marginTop: 4 },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
});
