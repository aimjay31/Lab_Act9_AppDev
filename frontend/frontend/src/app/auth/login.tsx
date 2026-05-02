import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import GlassCard from "@/components/ui/GlassCard";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Missing Fields", "Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.18.9:8000/api/user/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", data?.detail || "Invalid credentials");
        return;
      }

      await AsyncStorage.setItem("auth_token", data.token);

      router.replace("/tabs/dashboard");
    } catch (error) {
      Alert.alert("Error", "Cannot reach server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#013c58",
        justifyContent: "center",
        padding: 20,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* HEADER */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Ionicons name="school-outline" size={50} color="#f7ad19" />

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#a8e8f9",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Welcome to ShapR
        </Text>

        <Text style={{ color: "#a8e8f9", opacity: 0.6, marginTop: 5 }}>
          Focus. Learn. Improve.
        </Text>
      </View>

      {/* LOGIN CARD (GLASSMORPHISM) */}
      <GlassCard>
        {/* USERNAME */}
        <Text style={{ color: "#a8e8f9", marginBottom: 6 }}>Username</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#a8e8f9"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={{
            color: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#a8e8f9",
            paddingVertical: 8,
            marginBottom: 16,
          }}
        />

        {/* PASSWORD */}
        <Text style={{ color: "#a8e8f9", marginBottom: 6 }}>Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#a8e8f9"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            color: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#a8e8f9",
            paddingVertical: 8,
            marginBottom: 20,
          }}
        />

        {/* LOGIN BUTTON */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#f7ad19",
            padding: 14,
            borderRadius: 14,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#013c58" />
          ) : (
            <>
              <Ionicons name="log-in-outline" size={18} color="#013c58" />
              <Text style={{ color: "#013c58", fontWeight: "bold" }}>
                Login
              </Text>
            </>
          )}
        </Pressable>
      </GlassCard>

      {/* SIGNUP LINK */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "#a8e8f9" }}>
          Don’t have an account?{" "}
          <Text
            style={{
              color: "#f7ad19",
              fontWeight: "bold",
            }}
            onPress={() => router.push("/auth/signup")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}