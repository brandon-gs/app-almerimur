import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { theme } from "theme/";
import StyledText from "../StyledText";

interface SelectInputProps {
  color?: string;
  error?: string;
  value?: string;
  style?: ViewStyle;
  defaultValue?: string;
}

export default function SelectInput({
  color = theme.colors.secondary,
  error = "",
  value = "Prueba",
  defaultValue,
  style,
}: SelectInputProps) {
  //TODO: pasar options como prop
  const [showOptions, setShowOptions] = useState(false);
  const options = ["Prueba", "prueba 2", "prueba 3"];

  const handleShowOptions = () => setShowOptions((show) => !show);
  const handleSelectOption = () => {
    setShowOptions(false);
  };

  const currentColor = error ? "#FF0000" : color;
  const styles = getStyles(currentColor);

  return (
    <View style={style}>
      <View style={styles.root}>
        <TouchableOpacity style={styles.textInput} onPress={handleShowOptions}>
          {!value ? (
            <StyledText color={theme.colors.secondary}>Cliente</StyledText>
          ) : (
            <StyledText
              color={theme.colors.primary}
              style={{ fontWeight: "bold" }}
            >
              {value}
            </StyledText>
          )}
          <View style={styles.arrow} />
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.options}>
            {options.map((option, index) => {
              const isValueSelected =
                option === defaultValue || option === value;
              const textColor = isValueSelected
                ? theme.colors.light
                : theme.colors.primary;
              const viewStyle = isValueSelected
                ? styles.optionSelected
                : styles.option;
              return (
                <TouchableOpacity
                  key={`option-${index}`}
                  style={viewStyle}
                  onPress={handleSelectOption}
                >
                  <StyledText color={textColor} style={{ fontWeight: "bold" }}>
                    {option}
                  </StyledText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const option: ViewStyle = {
  height: 40,
  justifyContent: "center",
  paddingHorizontal: 16,
  borderBottomColor: theme.colors.secondary,
  borderBottomWidth: 0.2,
};

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
      justifyContent: "center",
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
    arrow: {
      position: "absolute",
      right: 8,
      width: 0,
      height: 0,
      borderLeftWidth: 7,
      borderRightWidth: 7,
      borderTopWidth: 12,
      borderStyle: "solid",
      backgroundColor: "transparent",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.colors.primary,
    },
    options: {
      width: 301,
      borderRightWidth: 0.2,
      borderLeftWidth: 0.2,
      borderRightColor: theme.colors.secondary,
      borderLeftColor: theme.colors.secondary,
    },
    option: { ...option, backgroundColor: theme.colors.light },
    optionSelected: { ...option, backgroundColor: theme.colors.primary },
  });
