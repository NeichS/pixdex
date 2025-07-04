import { Stack } from "expo-router";
import ContextoPlayerNameProvider from "@/src/context/PlayerName";

export default function RootLayout() {
  return (
    <ContextoPlayerNameProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ContextoPlayerNameProvider>
  );
}
