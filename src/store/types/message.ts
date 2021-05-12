enum MessageTypes {
  Success = "Success",
  Danger = "Danger",
  Info = "Info",
}

interface MessageState {
  message: string;
  show: boolean;
  type: MessageTypes;
}
