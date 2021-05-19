import { TextInputProps, ViewStyle } from "react-native";

export interface ITextInputProps extends TextInputProps {
  color?: string;
  style?: ViewStyle;
  error?: string;
  label: string;
  labelAlign?: "center" | "left";
}
