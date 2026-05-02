import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import GlassCard from "@/components/ui/GlassCard";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#013c58",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* LOGO / BRAND */}
      <GlassCard style={{ alignItems: "center", paddingVertical: 30 }}>
        <Ionicons name="flash" size={50} color="#f7ad19" />

        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
            color: "#a8e8f9",
            marginTop: 10,
            letterSpacing: 2,
          }}
        >
          ShapR
        </Text>

        <Text
          style={{
            color: "#a8e8f9",
            opacity: 0.6,
            marginTop: 6,
            textAlign: "center",
          }}
        >
          Focus. Learn. Improve.
        </Text>
      </GlassCard>

      {/* LOADING SECTION */}
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f7ad19" />

        <Text
          style={{
            marginTop: 12,
            color: "#a8e8f9",
            opacity: 0.7,
          }}
        >
          Initializing experience...
        </Text>
      </View>
    </View>
  );
}