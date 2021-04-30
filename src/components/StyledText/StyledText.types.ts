import { TextProps } from "react-native";

type TextAlign = "center" | "justify" | "left" | "right";

export interface StyledTextProps extends TextProps {
  children?: string;
  color?: string;
  size?: number;
  align?: TextAlign;
}
