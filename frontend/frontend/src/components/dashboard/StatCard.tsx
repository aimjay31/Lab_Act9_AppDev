import { View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function StatCard({ title, value, accent }: any) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 18,
        marginBottom: 12,

        borderWidth: 1,
        borderColor: colors.primary + "33",

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 12,
          opacity: 0.7,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: accent || colors.accent,
          fontSize: 26,
          fontWeight: "800",
          marginTop: 6,
        }}
      >
        {value}
      </Text>
    </View>
  );
}