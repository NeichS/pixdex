import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import { TextPressStart2P } from "../../components/TextPressStart2P";
import { useState, useEffect } from "react";
import { ROUTES } from "@/src/navigation/routes";
import { supabase } from "@/src/lib/supabase";

interface LeaderboardEntry {
  score: number;
  username: string;
}

export function StartScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  
  // 1. Carga inicial del leaderboard
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  
  const fetchLeaderboard = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hangman_scores")
      .select(
        `
      score,
      profiles (
        username
      )
    `
      )
      .order("score", { ascending: false })
      .limit(10);

    if (!error && data) {
      // Mapear a un array de { score, username }
      const flat = data.map((r) => ({
        score: r.score,
        username: Array.isArray(r.profiles)
          ? r.profiles[0]?.username ?? ""
          : r.profiles.username,
      }));
      setLeaderboard(flat);
    }
    setLoading(false);
  };

  const startGame = () => {
    router.push(ROUTES.HANGMAN_GAME);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Button label="BACK" action={router.back} iconName="arrow-back" />
      </View>

      <View style={styles.gameContainer}>
        <TextPressStart2P style={styles.title}>
          Hangman Challenge
        </TextPressStart2P>

        <Text style={styles.subtitle}>
          Guess the titles of popular TV shows, movies, and anime one letter at
          a time. You have 5 lives - can you get the highest score?
        </Text>

        <Button label="START GAME" action={startGame} />

        <TextPressStart2P style={styles.topPlayersTitle}>
          Top Players
        </TextPressStart2P>
        {loading ? (
          <ActivityIndicator color="#5FD068" size="large" />
        ) : (
        
          <FlatList
            data={leaderboard}
            keyExtractor={(item, index) =>
              `${item.username}-${item.score}-${index}`
            } 
            renderItem={({ item, index }) => {
              return (
                <View style={styles.row}>
                  <Text style={styles.rank}>{index + 1}.</Text>
                  <Text style={styles.player}>
                    {item.username || "Sin nombre"}
                  </Text>
                  <TextPressStart2P style={styles.score}>
                    <Text>
                      {item.score}
                    </Text>
                  </TextPressStart2P>
                </View>
              );
            }}
            style={styles.list} 
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    padding: 20,
  },
  topContainer: {
    width: 120,
  },
  gameContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#403E43",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#6E59A5",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 10,
  },
  topPlayersTitle: {
    color: "#5FD068",
    fontSize: 18,
    marginTop: 20,
  },
  list: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#403E43",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#403E43",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rank: {
    width: 30,
    color: "#FFFFFF",
    fontSize: 16,
  },
  player: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: 10,
  },
  score: {
    width: 50,
    textAlign: "right",
    color: "#5FD068",
    fontSize: 16,
  },
});
