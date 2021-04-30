import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import StyledText from "../StyledText";
import { ButtonProps } from "./Button.types";

function Button({
  text,
  styleText,
  loading,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = loading || disabled;

  const stylesDisabled = isDisabled
    ? {
        backgroundColor: "#76797B",
      }
    : {};

  return (
    <TouchableOpacity
      {...props}
      disabled={isDisabled}
      style={[style, stylesDisabled]}
    >
      {!loading && <StyledText {...styleText}>{text}</StyledText>}
      {loading && <ActivityIndicator color="#FFF" size="large" />}
    </TouchableOpacity>
  );
}

export default Button;
