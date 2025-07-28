import { createContext, useState, ReactNode, use, useEffect } from "react";
import { supabase } from "../lib/supabase";

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

  useEffect(() => {
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

    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error("Error al obtener sesión:", error);
          return;
        }
        if (session?.user) {
          fetchCurrentUsername(session.user.id).then((uname) => {
            if (uname) setPlayerName(uname);
            else {
              const meta = session.user.user_metadata?.username as string | undefined;
              if (meta) setPlayerName(meta.trim());
            }
          });
        }
      });
  }, []);


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
