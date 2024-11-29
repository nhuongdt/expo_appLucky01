import { Button } from "react-native";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button
        title=" Go back to Home screen!"
        onPress={() => navigation.navigate("navigation/sale_layout")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
