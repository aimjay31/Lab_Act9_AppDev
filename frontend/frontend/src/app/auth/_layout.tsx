import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";

const Colors = {
  light: {
    background: "#a8e8f9",
    primary: "#00537a",
    text: "#013c58",
    accent: "#f7ad19",
  },
  dark: {
    background: "#013c58",
    primary: "#00537a",
    text: "#a8e8f9",
    accent: "#f7ad19",
  },
};

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
        }}
      >

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
            animation: "fade",
          }}
        />
      </View>
    </View>
  );
}