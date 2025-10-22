import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login"); // 👉 Go to login after 3s
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Krishi Unnati</Text>
        <Text style={styles.tagline}>Your Digital Farming Assistant</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 68, 32, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 42, fontWeight: "bold", color: "#fff" },
  tagline: { fontSize: 18, color: "#E0E0E0", marginTop: 8 },
});
