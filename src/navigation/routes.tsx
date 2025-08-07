import { Href } from "expo-router";

export const ROUTES: Record<string, Href> = {
  HOME: "/",
  DETAIL: "/detail/", 
  HANGMAN: "/games/hangman/start-screen",
  HANGMAN_GAME: "/games/hangman/game",
  LOGIN: "/login"
};