import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "@/src/hooks/useAuth";

export default function AppHeader() {
  const { user } = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>App Name Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 95,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#071B33",
    justifyContent: "center",
  },
  logo: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
});
