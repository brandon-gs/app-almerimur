import { TouchableOpacityProps } from "react-native";
import { StyledTextProps } from "../StyledText/StyledText.types";

export enum ButtonTypes {
  Default = "default",
  Outlined = "outlined",
}

export interface ButtonProps extends TouchableOpacityProps {
  text: string;
  styleText?: StyledTextProps;
  loading?: boolean;
  type?: ButtonTypes;
}
