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
import { Ionicons } from "@expo/vector-icons";

import GlassCard from "@/components/ui/GlassCard";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Missing Fields", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.18.9:8000/api/user/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        Alert.alert("Error", "Backend did not return JSON");
        return;
      }

      if (response.ok) {
        Alert.alert("Success", "Account created!");
        router.replace("/auth/login");
      } else {
        Alert.alert("Signup Failed", JSON.stringify(data));
      }
    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
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
        <Ionicons name="person-add-outline" size={50} color="#f7ad19" />

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#a8e8f9",
            marginTop: 10,
          }}
        >
          Create your account
        </Text>

        <Text style={{ color: "#a8e8f9", opacity: 0.6, marginTop: 5 }}>
          Start your focus journey
        </Text>
      </View>

      {/* GLASS SIGNUP CARD */}
      <GlassCard>
        {/* USERNAME */}
        <Text style={{ color: "#a8e8f9", marginBottom: 6 }}>
          Username
        </Text>
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
            marginBottom: 14,
          }}
        />

        {/* EMAIL */}
        <Text style={{ color: "#a8e8f9", marginBottom: 6 }}>
          Email
        </Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#a8e8f9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            color: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#a8e8f9",
            paddingVertical: 8,
            marginBottom: 14,
          }}
        />

        {/* PASSWORD */}
        <Text style={{ color: "#a8e8f9", marginBottom: 6 }}>
          Password
        </Text>
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

        {/* SIGNUP BUTTON */}
        <Pressable
          onPress={handleSignup}
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
              <Ionicons name="checkmark-circle-outline" size={18} color="#013c58" />
              <Text style={{ color: "#013c58", fontWeight: "bold" }}>
                Create Account
              </Text>
            </>
          )}
        </Pressable>
      </GlassCard>

      {/* LOGIN LINK */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "#a8e8f9" }}>
          Already have an account?{" "}
          <Text
            style={{ color: "#f7ad19", fontWeight: "bold" }}
            onPress={() => router.replace("/auth/login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}