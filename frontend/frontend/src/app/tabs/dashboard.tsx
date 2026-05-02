import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { apiFetch } from "@/utils/api";

export default function Dashboard() {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await apiFetch("/study_session/history/");

      if (!res.ok) return;

      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    };

    load();
  }, []);

  const total = sessions.length;

  const avgDuration =
    total > 0
      ? sessions.reduce((a, s) => a + (s.duration || 0), 0) / total
      : 0;

  const avgRating =
    total > 0
      ? sessions.reduce((a, s) => a + (s.productivity_rating || 0), 0) /
        total
      : 0;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Dashboard</Text>

      <Text>Total Sessions: {total}</Text>
      <Text>Avg Duration: {avgDuration.toFixed(1)}</Text>
      <Text>Avg Productivity: {avgRating.toFixed(1)}</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Study Tips
      </Text>
      <Text>Stay consistent. Focus = long hours.</Text>
    </ScrollView>
  );
}