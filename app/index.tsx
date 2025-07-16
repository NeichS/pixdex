import { HomeScreen } from "../src/screens/HomeScreen";
import ContextoContenidosProvider from "@/src/context/Contenidos";
import ContextoFilterProvider from "@/src/context/Filter";
import ContextoPlayerNameProvider from "@/src/context/PlayerName";
import { LoginScreen } from "@/src/screens/LoginScreen";
import { supabase } from '@/src/lib/supabase'
import { useEffect, useState } from "react";
import { Session } from '@supabase/supabase-js'

export default function App() {
  
   const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <ContextoContenidosProvider>
      <ContextoFilterProvider>
          {session && session.user ? <HomeScreen /> : <LoginScreen />}
      </ContextoFilterProvider>
    </ContextoContenidosProvider>
  );
} 