import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function SectionCard({ children }: any) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 20,
        marginTop: 16,

        borderWidth: 1,
        borderColor: colors.primary + "22",

        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
}