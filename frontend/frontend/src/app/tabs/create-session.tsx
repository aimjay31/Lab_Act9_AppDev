import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { apiFetch } from "@/utils/api";

export default function Session() {
  const [subject, setSubject] = useState("");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [rating, setRating] = useState("");

  useEffect(() => {
    let interval: any;

    if (running) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const startSession = async () => {
    if (!subject.trim()) return Alert.alert("Enter subject");

    const res = await apiFetch("/study_session/start/", {
      method: "POST",
      body: JSON.stringify({ subject }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.log(err);
      return Alert.alert("Error", "Start failed");
    }

    setRunning(true);
  };

  const endSession = async () => {
    if (!rating) return Alert.alert("Enter rating");

    setRunning(false);

    const res = await apiFetch("/study_session/end/", {
      method: "POST",
      body: JSON.stringify({
        productivity_rating: Number(rating),
      }),
    });

    if (!res.ok) return Alert.alert("Error", "End failed");

    Alert.alert("Session saved!");
    setSeconds(0);
    setSubject("");
    setRating("");
  };

  return (
    <View style={{ padding: 20 }}>
      {!running ? (
        <>
          <TextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />

          <Pressable onPress={startSession}>
            <Text>Start Session</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 40 }}>{seconds}s</Text>

          <TextInput
            placeholder="Rating 1-10"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            style={{ borderWidth: 1, padding: 10 }}
          />

          <Pressable onPress={endSession}>
            <Text>End Session</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}