import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

export default function Session() {
  const { colors } = useTheme();

  const [subject, setSubject] = useState("");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [rating, setRating] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);

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

    if (!res.ok) return Alert.alert("Error", "Start failed");

    setRunning(true);
  };

 
  const stopSession = () => {
    setRunning(false);
    setShowRatingModal(true);
  };


  const finishSession = async () => {
    if (!rating) return Alert.alert("Enter rating");

    const res = await apiFetch("/study_session/end/", {
      method: "POST",
      body: JSON.stringify({
        productivity_rating: Number(rating),
      }),
    });

    if (!res.ok) return Alert.alert("Error", "Save failed");

    setShowRatingModal(false);
    setSeconds(0);
    setSubject("");
    setRating("");

    Alert.alert("Session saved!");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, justifyContent: "center" }}>

        {/* TITLE */}
        <Text style={{ fontSize: 26, fontWeight: "bold", color: colors.text, textAlign: "center" }}>
          Focus Session
        </Text>

        {/* TIMER */}
        <GlassCard style={{ alignItems: "center", paddingVertical: 30, marginTop: 20 }}>
          <Ionicons name="time-outline" size={32} color={colors.accent} />

          <Text style={{ fontSize: 52, fontWeight: "800", color: colors.text }}>
            {seconds}s
          </Text>

          <Text style={{ color: colors.text, opacity: 0.6 }}>
            {running ? "Focus mode active" : "Ready"}
          </Text>
        </GlassCard>

        {/* START / STOP */}
        {!running ? (
          <GlassCard style={{ marginTop: 16 }}>
            <Text style={{ color: colors.text }}>Subject</Text>

            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder="Study subject"
              placeholderTextColor={colors.text}
              style={{
                color: colors.text,
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
                paddingVertical: 8,
                marginTop: 8,
              }}
            />

            <Pressable
              onPress={startSession}
              style={{
                marginTop: 16,
                backgroundColor: colors.accent,
                padding: 14,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#0b0f14" }}>
                Start Session
              </Text>
            </Pressable>
          </GlassCard>
        ) : (
          <Pressable
            onPress={stopSession}
            style={{
              marginTop: 20,
              backgroundColor: "#f7ad19",
              padding: 14,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Stop Session
            </Text>
          </Pressable>
        )}

        {/* ⭐ FLOATING RATING MODAL */}
        <Modal visible={showRatingModal} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GlassCard style={{ width: "85%", padding: 20, alignItems: "center" }}>

              <Ionicons name="star" size={40} color={colors.accent} />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text,
                  marginTop: 10,
                }}
              >
                Rate Your Session
              </Text>

              <TextInput
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
                placeholder="1 - 10"
                placeholderTextColor={colors.text}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.primary,
                  color: colors.text,
                  width: "100%",
                  marginTop: 16,
                  textAlign: "center",
                  fontSize: 18,
                }}
              />

              <Pressable
                onPress={finishSession}
                style={{
                  marginTop: 20,
                  backgroundColor: colors.accent,
                  padding: 12,
                  borderRadius: 14,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#0b0f14",
                  }}
                >
                  Finish Session
                </Text>
              </Pressable>

            </GlassCard>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}