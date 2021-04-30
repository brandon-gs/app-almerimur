import React from "react";
import { MessageProps } from "./Message.types";
import { StyleSheet, View } from "react-native";
import StyledText from "../StyledText";

function Message({
  show,
  message = "Mensaje por defecto",
  style,
  ...props
}: MessageProps) {
  return (
    show && (
      <View style={[styles.root, style]} {...props}>
        <StyledText color="#FFF">{message}</StyledText>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    padding: 8,
    backgroundColor: "#FF0000",
    width: "100%",
  },
});

export default Message;
