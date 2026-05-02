import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export default function TabLayout() {
  const { colors, theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, paddingTop: 35 }}>
        <Tabs
          screenOptions={{
            headerShown: false,

            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.primary,
              borderTopWidth: 0.5,
              height: 60,
              paddingBottom: 8,
            },

            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.text,

            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
          }}
        >
          <Tabs.Screen
            name="dashboard"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="history"
            options={{
              title: "History",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "time" : "time-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="create-session"
            options={{
              title: "Session",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="add-circle"
                  size={size + 2}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}