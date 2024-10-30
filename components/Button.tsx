import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  label: string;
  style?: ViewStyle;
  onPress?: () => void;
};
export default function Button({ label, onPress, style }: Props) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20, // = marginleft:20, marginright 20
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
