import { View, Text } from "react-native";
import { BlurView } from "expo-blur";

export default function GlassToast({ message }: { message: string }) {
  return (
    <BlurView
      intensity={30}
      tint="dark"
      style={{
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: "rgba(0, 83, 122, 0.3)",
        borderWidth: 1,
        borderColor: "rgba(168, 232, 249, 0.2)",
      }}
    >
      <Text style={{ color: "#a8e8f9", fontWeight: "600" }}>
        {message}
      </Text>
    </BlurView>
  );
}