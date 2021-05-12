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
  type,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(loading || disabled);
  const stylesDisabled = getDisabledStyles(isDisabled);

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

const getDisabledStyles = (disabled: boolean) => {
  if (disabled) {
    return { backgroundColor: "#76797B" };
  }
  return {};
};

export default Button;
