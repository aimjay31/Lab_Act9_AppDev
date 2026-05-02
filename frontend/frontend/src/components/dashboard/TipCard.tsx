import { View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function TipCard({ text }: any) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 14,
        borderRadius: 14,
        marginTop: 10,

        borderWidth: 1,
        borderColor: colors.accent + "33",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 13,
          lineHeight: 18,
        }}
      >
        {text}
      </Text>
    </View>
  );
}