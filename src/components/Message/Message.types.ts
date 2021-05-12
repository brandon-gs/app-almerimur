import { ViewProps } from "react-native";
import { MessageTypes } from "store/reducers/message";

export interface MessageProps extends ViewProps {
  message: string;
  show: boolean;
  type: MessageTypes;
  onPress: () => void;
}
