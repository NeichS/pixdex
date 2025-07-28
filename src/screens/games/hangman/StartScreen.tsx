import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import { TextPressStart2P } from "../../components/TextPressStart2P";
import { useState, useEffect, useRef } from "react";
import { ROUTES } from "@/src/navigation/routes";
import { supabase } from "@/src/lib/supabase";

interface LeaderboardEntry {
  score: number;
  username: string;
}

export function StartScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    fetchLeaderboard();
    setupRealtimeSubscription();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  // Función helper para mapear datos de forma consistente
  const mapLeaderboardEntry = (record: any): LeaderboardEntry => ({
    score: record.score,
    username: record.profiles?.username || "Usuario Anónimo",
  });

  const fetchLeaderboard = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("hangman_scores")
        .select(
          `
          score,
          profiles!inner (
            username
          )
        `
        )
        .order("score", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching leaderboard:", error);
        return;
      }

      if (data) {
        const mappedData = data.map(mapLeaderboardEntry);
        setLeaderboard(mappedData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    subscriptionRef.current = supabase
      .channel("hangman_scores_realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "hangman_scores",
        },
        async (payload) => {
          console.log("New score inserted:", payload);

          // Obtener el score completo con el username
          const { data: newScoreData, error } = await supabase
            .from("hangman_scores")
            .select(
              `
              score,
              profiles!inner (
                username
              )
            `
            )
            .eq("id", payload.new.id)
            .single();

          if (!error && newScoreData) {
            const newEntry = mapLeaderboardEntry(newScoreData);

            setLeaderboard((currentLeaderboard) => {
              const updated = [...currentLeaderboard, newEntry]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);

              return updated;
            });
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "hangman_scores",
        },
        () => {
          console.log("Score updated - refetching leaderboard");
          fetchLeaderboard();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "hangman_scores",
        },
        () => {
          console.log("Score deleted - refetching leaderboard");
          fetchLeaderboard();
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log("✅ Real-time subscription active");
        }
      });
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
          <View style={styles.list}>
            {Array.from({ length: 10 }).map((_, i) => (
              <View style={styles.skeletonRow} key={i}>
                <View style={styles.skeletonRank} />
                <View style={styles.skeletonPlayer} />
                <View style={styles.skeletonScore} />
              </View>
            ))}
          </View>
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
                    {item.score}
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
    marginBottom: 20,
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
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  skeletonRank: {
    width: 30,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#555",
  },
  skeletonPlayer: {
    flex: 1,
    height: 16,
    borderRadius: 4,
    marginHorizontal: 10,
    backgroundColor: "#555",
  },
  skeletonScore: {
    width: 50,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#555",
  },
  list: {
    width: "100%",
    gap: 10,
    backgroundColor: "#403E43",
    padding: 15,
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
    textAlign: "right",
    width: 50,
    color: "#5FD068",
    fontSize: 16,
    marginTop: 5,
  },
});
