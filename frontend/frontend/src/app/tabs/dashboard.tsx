import { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

import StatCard from "@/components/dashboard/StatCard";
import SectionCard from "@/components/dashboard/SectionCard";
import TipCard from "@/components/dashboard/TipCard";

import { useTheme } from "@/context/ThemeContext";

export default function Dashboard() {
  const [sessions, setSessions] = useState<any[]>([]);
  const { colors } = useTheme();

  const load = async () => {
    try {
      const res = await apiFetch("/study_session/history/");
      if (!res.ok) return;

      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Dashboard load error", e);
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

  const total = sessions.length;

  const avgDuration =
    total > 0
      ? sessions.reduce((a, s) => a + (s.duration || 0), 0) / total
      : 0;

  const avgRating =
    total > 0
      ? sessions.reduce((a, s) => a + (s.productivity_rating || 0), 0) / total
      : 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* HEADER */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        Dashboard
      </Text>

      <Text style={{ color: colors.text, opacity: 0.6, marginTop: 4 }}>
        AI-powered study analytics overview
      </Text>

      {/* LIVE STATUS */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Ionicons name="pulse" size={18} color={colors.accent} />
        <Text style={{ color: colors.text, opacity: 0.7 }}>
          Live insights updating
        </Text>
      </View>

      {/* STATS */}
      <View style={{ marginTop: 10 }}>
        <StatCard title="Total Sessions" value={total} />
        <StatCard title="Avg Duration (mins)" value={avgDuration.toFixed(1)} />
        <StatCard
          title="Productivity Score"
          value={avgRating.toFixed(1)}
          accent={colors.accent}
        />
      </View>

      {/* INSIGHTS */}
      <SectionCard>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="bulb-outline" size={18} color={colors.accent} />
          <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>
            AI Insights
          </Text>
        </View>

        <TipCard text="Your consistency improves when you study at the same time daily." />
        <TipCard text="Sessions above 25 mins show higher productivity retention." />
        <TipCard text="Avoid multitasking during focus sessions." />
      </SectionCard>

      {/* FUTURE */}
      <SectionCard>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            name="trending-up-outline"
            size={18}
            color={colors.accent}
          />
          <Text style={{ color: colors.text, fontWeight: "bold" }}>
            Weekly Trend (Coming Soon)
          </Text>
        </View>

        <Text style={{ color: colors.text, opacity: 0.6, marginTop: 6 }}>
          Graph visualization will appear here
        </Text>
      </SectionCard>
    </ScrollView>
  );
}