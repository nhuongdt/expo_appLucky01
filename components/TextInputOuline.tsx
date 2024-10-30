import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
type Props = {
  placeholder?: string;
  style?: ViewStyle;
  secureTextEntry?: boolean;
  onChangeText?: (val: string) => void;
};
const TextInputOutline = ({
  placeholder,
  style,
  secureTextEntry = false,
  onChangeText,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      placeholder={placeholder ?? ""}
      placeholderTextColor={"#ccc"}
      secureTextEntry={secureTextEntry}
      style={[style, styles.defaultStyle, isFocused && styles.focusedInput]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={onChangeText}
    />
  );
};

export default TextInputOutline;

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 8,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderStyle: "solid",
    height: 40,
  },
  focusedInput: {
    borderWidth: 0,
  },
});
