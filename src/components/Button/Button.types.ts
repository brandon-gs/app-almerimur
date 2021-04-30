import { TouchableOpacityProps } from "react-native";
import { StyledTextProps } from "../StyledText/StyledText.types";

export interface ButtonProps extends TouchableOpacityProps {
  text: string;
  styleText?: StyledTextProps;
  loading?: boolean;
}
