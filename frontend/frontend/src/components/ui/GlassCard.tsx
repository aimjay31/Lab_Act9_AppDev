import { BlurView } from "expo-blur";
import { ViewStyle } from "react-native";

export default function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <BlurView
      intensity={25}
      tint="dark"
      style={[
        {
          padding: 16,
          borderRadius: 18,
          marginBottom: 12,
          overflow: "hidden",
          backgroundColor: "rgba(0, 83, 122, 0.25)",
          borderWidth: 1,
          borderColor: "rgba(168, 232, 249, 0.15)",
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}