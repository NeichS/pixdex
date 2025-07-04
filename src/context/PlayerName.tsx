import { createContext, useState, ReactNode } from "react";
import { Text } from "react-native";

interface PropsProvider {
  children: ReactNode;
}

interface IContextoPlayerName {
    playerName: string;
    getPlayerName: () => string;
    setPlayerNameHandler: (name: string) => void;
}

export const ContextoPlayerName = createContext<IContextoPlayerName>({
  playerName : "",
  getPlayerName: () => {
    throw new Error("PlayerNameContext: getPlayerName not initialized");
  },
  setPlayerNameHandler: (name: string) => {
    throw new Error("PlayerNameContext: setPlayerName not initialized");
  },
});

export default function ContextoPlayerNameProvider({
  children,
}: PropsProvider) {
  const [playerName, setPlayerName] = useState<string>("");

  const getPlayerName = () => playerName;

  const setPlayerNameHandler = (name: string) => {
    if (name.trim() === "") {
      throw new Error("PlayerNameContext: Player name cannot be empty");
    }
    setPlayerName(name);
  };

  const valueContexto : IContextoPlayerName = {
    playerName,
    getPlayerName,
    setPlayerNameHandler,
  }
  return (
    <ContextoPlayerName.Provider value={valueContexto}>
      {children}
    </ContextoPlayerName.Provider>
  );
}
