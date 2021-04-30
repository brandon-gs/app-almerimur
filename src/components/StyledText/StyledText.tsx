import React from "react";
import { Text } from "react-native";
import { StyledTextProps } from "./StyledText.types";

function StyledText({
  align,
  color = "#000",
  size = 2,
  children = "text",
  style,
  ...props
}: StyledTextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          color,
          fontSize: 8 * size,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export default StyledText;
