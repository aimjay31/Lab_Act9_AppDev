import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";

import GlassCard from "@/components/ui/GlassCard";
import GlassToast from "@/components/ui/GlassToast";
import { useTheme } from "@/context/ThemeContext";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState("");

  const { colors, theme, toggleTheme } = useTheme();

  const load = async () => {
    const res = await apiFetch("/user/profile/");
    const data = await res.json();

    setProfile(data);
    setFirstName(data.first_name || "");
    setLastName(data.last_name || "");
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const res = await apiFetch("/user/update/", {
      method: "PUT",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);

      setToast("Profile updated");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const fullName =
    `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() ||
    "No name set";

  if (!profile) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>

        {/* TITLE */}
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: colors.text,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Profile
        </Text>

        {/* PROFILE CARD */}
        <GlassCard style={{ alignItems: "center" }}>
          <Ionicons name="person-circle" size={80} color={colors.accent} />

          {/* FULL NAME (NEW) */}
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {fullName}
          </Text>

          {/* USERNAME */}
          <Text style={{ color: colors.text, opacity: 0.7, marginTop: 4 }}>
            @{profile.username}
          </Text>

          {/* EMAIL */}
          <Text style={{ color: colors.text, marginTop: 6 }}>
            {profile.email}
          </Text>

          {/* EDIT FORM */}
          {!editing ? (
            <Pressable
              onPress={() => setEditing(true)}
              style={{
                marginTop: 16,
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
                Edit Profile
              </Text>
            </Pressable>
          ) : (
            <View style={{ width: "100%", marginTop: 12 }}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor={colors.text}
                value={firstName}
                onChangeText={setFirstName}
                style={{
                  color: colors.text,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.primary,
                  paddingVertical: 8,
                  marginBottom: 12,
                }}
              />

              <TextInput
                placeholder="Last Name"
                placeholderTextColor={colors.text}
                value={lastName}
                onChangeText={setLastName}
                style={{
                  color: colors.text,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.primary,
                  paddingVertical: 8,
                }}
              />

              <Pressable
                onPress={save}
                style={{
                  marginTop: 16,
                  backgroundColor: colors.accent,
                  padding: 12,
                  borderRadius: 14,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#0b0f14",
                  }}
                >
                  Save Changes
                </Text>
              </Pressable>
            </View>
          )}
        </GlassCard>

        {/* SETTINGS */}
        <GlassCard style={{ marginTop: 20 }}>
          <Text style={{ color: colors.text, fontWeight: "bold" }}>
            Settings
          </Text>

          {/* SWITCH ROW */}
          <View
            style={{
              marginTop: 14,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                Dark Mode
              </Text>
              <Text style={{ color: colors.text, opacity: 0.6, fontSize: 12 }}>
                Switch app appearance
              </Text>
            </View>

            {/* SWITCH */}
            <Pressable
              onPress={toggleTheme}
              style={{
                width: 52,
                height: 30,
                borderRadius: 999,
                backgroundColor: theme === "dark" ? colors.accent : colors.primary,
                padding: 3,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  backgroundColor: "#ffffff",
                  transform: [
                    { translateX: theme === "dark" ? 22 : 0 },
                  ],
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              />
            </Pressable>
          </View>
        </GlassCard>

        {/* TOAST */}
        {toast !== "" && <GlassToast message={toast} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}