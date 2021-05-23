import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "theme/";
import StyledText from "../StyledText";

interface SelectInputProps {
  color?: string;
  error?: string;
  value?: string | null;
  placeholder?: string;
  options?: string[];
  editable?: boolean;
  style?: ViewStyle;
  positionOptions?: "absolute" | "relative";
  labelError?: boolean;
  onPressOption?: (option: string) => void | Promise<void>;
  visiblePlaceholder?: boolean;
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function SelectInput({
  color = theme.colors.secondary,
  error = "",
  value = "",
  placeholder = "",
  defaultValue,
  labelError = false,
  editable = true,
  options = [],
  positionOptions = "absolute",
  onChange,
  onPressOption,
  style,
}: SelectInputProps) {
  const [showOptions, setShowOptions] = useState(false);

  const hideOptions = () => {
    if (showOptions) {
      setShowOptions(false);
    }
  };
  const handleShowOptions = () => setShowOptions((show) => !show);
  const handleSelectOption = (value: string) => {
    onChange(value);
    setShowOptions(false);
  };

  const currentColor = error ? "#FF0000" : color;
  const styles = getStyles(currentColor, value, labelError, positionOptions);

  return (
    <>
      <View style={style}>
        <View style={styles.root}>
          {Boolean((placeholder && value) || labelError) && (
            <StyledText
              color={labelError ? theme.colors.error : theme.colors.secondary}
              style={styles.visiblePlaceholder}
            >
              {placeholder}
            </StyledText>
          )}
          <TouchableOpacity
            style={styles.textInput}
            onPress={handleShowOptions}
            disabled={!editable}
          >
            {Boolean(!value && !labelError) && (
              <StyledText color={theme.colors.secondary}>
                {placeholder}
              </StyledText>
            )}
            {Boolean(value) && (
              <StyledText
                color={theme.colors.primary}
                style={{ fontWeight: "bold" }}
              >
                {value}
              </StyledText>
            )}
            <View style={styles.arrow} />
          </TouchableOpacity>
        </View>
        {showOptions && (
          <View style={styles.options}>
            <ScrollView>
              {options.map((option, index) => {
                const isValueSelected =
                  option === defaultValue || option === value;

                return (
                  <Pressable
                    key={`option-${index}`}
                    style={({ pressed }) => {
                      const viewStyle = pressed
                        ? styles.optionSelected
                        : styles.option;
                      return [
                        {
                          backgroundColor: isValueSelected
                            ? theme.colors.primaryLight
                            : pressed
                            ? theme.colors.primary
                            : theme.colors.light,
                        },
                        viewStyle,
                      ];
                    }}
                    onPress={() =>
                      onPressOption
                        ? onPressOption(option)
                        : handleSelectOption(option)
                    }
                  >
                    {({ pressed }) => {
                      let textColor = pressed
                        ? theme.colors.light
                        : theme.colors.primary;

                      return (
                        <StyledText
                          color={textColor}
                          style={{ fontWeight: "bold" }}
                        >
                          {option}
                        </StyledText>
                      );
                    }}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
      {showOptions && (
        <Pressable
          style={{
            position: "absolute",
            top: -200,
            left: 0,
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            zIndex: 1000,
          }}
          onPress={hideOptions}
        />
      )}
    </>
  );
}

const option: ViewStyle = {
  height: 40,
  justifyContent: "center",
  paddingHorizontal: 16,
  borderWidth: 0.5,
  borderColor: theme.colors.secondary,
  zIndex: 1011,
};

const getStyles = (
  color: string,
  value: string | null,
  error: boolean,
  positionOptions: "absolute" | "relative"
) =>
  StyleSheet.create({
    root: {
      position: "relative",
    },
    visiblePlaceholder: {
      marginBottom: 4,
    },
    textInput: {
      position: "relative",
      width: 302,
      height: 40,
      borderWidth: 1,
      borderColor: !error ? color : theme.colors.error,
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
      position: positionOptions,
      alignContent: "flex-end",
      top:
        positionOptions === "relative" ? 0 : Boolean(value || error) ? 69 : 40,
      width: 301,
      zIndex: 1010,
      height: positionOptions === "relative" ? "auto" : 240,
      maxHeight: positionOptions === "relative" ? 200 : 240,
    },
    option: { ...option },
    optionSelected: { ...option, backgroundColor: theme.colors.primary },
  });
