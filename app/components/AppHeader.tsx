import { Text, View, StyleSheet } from "react-native";

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Field Nexus</Text>
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