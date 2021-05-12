import React from "react";
import { Text } from "react-native";
import { StyledTextProps } from "./StyledText.types";

function StyledText({
  align,
  color = "#000",
  size = 2,
  children,
  style,
  ...props
}: StyledTextProps) {
  return (
    <Text
      style={[
        {
          color,
          fontSize: 8 * size,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export default StyledText;
