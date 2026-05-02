import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { apiFetch } from "@/utils/api";

export default function History() {
  const [sessions, setSessions] = useState<any[]>([]);

  const load = async () => {
    const res = await apiFetch("/study_session/history/");
    const data = await res.json();
    setSessions(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load();
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
    <FlatList
      data={sessions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.subject}</Text>
          <Text>{item.duration} mins</Text>
          <Text>Rating: {item.productivity_rating}</Text>

          <Pressable
            onPress={() => deleteSession(item.id)}
            style={{
              marginTop: 10,
              backgroundColor: "red",
              padding: 8,
            }}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </Pressable>
        </View>
      )}
    />
  );
}