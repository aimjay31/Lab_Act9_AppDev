import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

export default function History() {
  const [sessions, setSessions] = useState<any[]>([]);
  const { colors } = useTheme();

  const load = async () => {
    try {
      const res = await apiFetch("/study_session/history/");
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("History load error", e);
    }
  };


  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

 
  useEffect(() => {
    const interval = setInterval(() => {
      load();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const deleteSession = async (id: number) => {
    const res = await apiFetch(`/study_session/delete/${id}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      Alert.alert("Deleted");
      load();
    } else {
      Alert.alert("Error deleting");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>

      {/* HEADER */}
      <Text style={{ fontSize: 26, fontWeight: "bold", color: colors.text }}>
        Session History
      </Text>

      <Text style={{ color: colors.text, opacity: 0.6, marginBottom: 20 }}>
        Your study activity timeline
      </Text>

      {/* LIST */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <GlassCard>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Ionicons name="book-outline" size={18} color={colors.accent} />
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
                  {item.subject}
                </Text>
              </View>

              <Pressable
                onPress={() => deleteSession(item.id)}
                style={{
                  padding: 6,
                  borderRadius: 10,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.accent + "55",
                }}
              >
                <Ionicons name="trash-outline" size={18} color={colors.accent} />
              </Pressable>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={{ color: colors.text, opacity: 0.8 }}>
                ⏱ Duration: {item.duration} mins
              </Text>

              <Text style={{ color: colors.text, opacity: 0.8 }}>
                ⭐ Productivity: {item.productivity_rating}
              </Text>
            </View>

            <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.accent,
                }}
              />
              <Text style={{ color: colors.text, fontSize: 12, opacity: 0.7 }}>
                Session logged
              </Text>
            </View>

          </GlassCard>
        )}
      />
    </View>
  );
}