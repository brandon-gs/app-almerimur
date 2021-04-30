import { ViewProps } from "react-native";

export interface MessageProps extends ViewProps {
  message: string;
  show: boolean;
}
