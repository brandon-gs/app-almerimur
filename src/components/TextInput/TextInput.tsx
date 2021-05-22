import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { theme } from "theme/";
import StyledText from "../StyledText";
import { ITextInputProps } from "./TextInput.types";

function TextInputCustom({
  color = theme.colors.secondary,
  label = "input",
  labelAlign = "center",
  labelError = false,
  error = "",
  showTopLabel = true,
  value,
  style,
  ...props
}: ITextInputProps) {
  const currentColor = error ? "#FF0000" : color;

  const styles = getStyles(currentColor, labelAlign, labelError);
  const textInputRef = useRef<any>();

  const [moveLabel, setMoveLabel] = React.useState(false);

  const handleTouchLabel = () => {
    textInputRef.current.focus();
  };

  return (
    <View style={style}>
      <View style={styles.root}>
        {Boolean((label && moveLabel) || (label && value) || labelError) &&
          showTopLabel && (
            <StyledText
              color={labelError ? theme.colors.error : theme.colors.secondary}
              style={styles.labelUp}
            >
              {label}
            </StyledText>
          )}
        <TextInput
          onBlur={() => setMoveLabel(false)}
          onFocus={() => setMoveLabel(true)}
          style={styles.textInput}
          value={value}
          ref={textInputRef}
          {...props}
        />
        {/** Label */}
        {Boolean(!value && !moveLabel && !labelError) && (
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

const getStyles = (color: string, labelAlign: string, labelError: boolean) =>
  StyleSheet.create({
    root: {
      position: "relative",
    },
    textInput: {
      position: "relative",
      width: 302,
      height: 40,
      borderWidth: 1,
      borderColor: labelError ? theme.colors.error : color,
      paddingHorizontal: 8,
      fontSize: 16,
      marginTop: 24,
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
      alignItems: labelAlign === "center" ? "center" : "flex-start",
      paddingLeft: labelAlign !== "center" ? 8 : 0,
    },
    text: {
      color: color,
      fontSize: 16,
      top: 12,
    },
    labelUp: {
      position: "absolute",
      top: -8,
    },
    textError: {
      color: color,
      fontSize: 16,
      position: "absolute",
      bottom: 0,
    },
  });

export default TextInputCustom;
