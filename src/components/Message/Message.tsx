import React from "react";
import { MessageProps } from "./Message.types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import Close from "assets/Close.svg";
import { MessageTypes } from "store/reducers/message";

function Message({
  show,
  message = "Mensaje por defecto",
  style,
  type = MessageTypes.Danger,
  onPress,
  ...props
}: MessageProps) {
  return show ? (
    <View style={[styles.root, styles[type], style]} {...props}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          <StyledText color="#FFF" style={styles.text} size={2.5}>
            {message}
          </StyledText>
          <View style={styles.icon}>
            <Close width={18} height={18} fill="#FFF" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    padding: 8,
    backgroundColor: "#ff3838",
    width: "100%",
    zIndex: 100000,
  },
  text: {
    maxWidth: "92%",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: "8%",
    alignItems: "center",
  },
  Danger: {
    backgroundColor: "#ff3838",
  },
  Info: {
    backgroundColor: "#22a6b3",
  },
  Success: {
    backgroundColor: "#6ab04c",
  },
});

export default Message;
