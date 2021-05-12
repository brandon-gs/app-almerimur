import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { theme } from "theme/";
import { ITextInputProps } from "./TextInput.types";

function TextInputCustom({
  color = theme.colors.secondary,
  label = "input",
  error = "",
  value,
  style,
  ...props
}: ITextInputProps) {
  const currentColor = error ? "#FF0000" : color;

  const styles = getStyles(currentColor);
  const textInputRef = useRef<any>();

  const handleTouchLabel = () => {
    textInputRef.current.focus();
  };

  return (
    <View style={style}>
      <View style={styles.root}>
        <TextInput
          style={styles.textInput}
          value={value}
          ref={textInputRef}
          {...props}
        />

        {/** Label */}
        {!value && (
          <View style={styles.textContainer} onTouchStart={handleTouchLabel}>
            <Text style={styles.text}>{label}</Text>
          </View>
        )}
      </View>
      <View style={{ height: 22, width: "100%" }}>
        {Boolean(error) && <Text style={styles.textError}>{error}</Text>}
      </View>
    </View>
  );
}

const getStyles = (color: string) =>
  StyleSheet.create({
    root: {
      position: "relative",
    },
    textInput: {
      position: "relative",
      width: 302,
      height: 40,
      borderWidth: 1,
      borderColor: color,
      paddingHorizontal: 8,
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    textContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: color,
      fontSize: 16,
    },
    textError: {
      color: color,
      fontSize: 16,
      position: "absolute",
      bottom: 0,
    },
  });

export default TextInputCustom;
