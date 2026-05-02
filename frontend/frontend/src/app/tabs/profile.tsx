import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { apiFetch } from "@/utils/api";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [editing, setEditing] = useState(false);

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
    }
  };

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Profile
      </Text>

      <Text>Username: {profile.username}</Text>
      <Text>Email: {profile.email}</Text>

      <Text style={{ marginTop: 10 }}>
        First Name: {profile.first_name || "Not set"}
      </Text>

      <Text>
        Last Name: {profile.last_name || "Not set"}
      </Text>

      {!editing ? (
        <Pressable onPress={() => setEditing(true)}>
          <Text style={{ color: "blue", marginTop: 10 }}>
            Edit Profile
          </Text>
        </Pressable>
      ) : (
        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />

          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={{ borderWidth: 1, padding: 10 }}
          />

          <Pressable onPress={save}>
            <Text style={{ color: "green", marginTop: 10 }}>
              Save
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}