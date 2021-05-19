import React, { useState } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "theme/";
import StyledText from "../StyledText";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { formatDate } from "helpers/";

interface DateInputProps {
  color?: string;
  error?: string;
  value: Date | null;
  placeholder?: string;
  labelError?: boolean;
  style?: ViewStyle;
  visiblePlaceholder?: boolean;
  onChange: (value: Date) => void;
  defaultValue?: string;
}

export default function DateInput({
  color = theme.colors.secondary,
  error = "",
  value,
  labelError = false,
  placeholder = "",
  defaultValue,
  onChange,
  style,
}: DateInputProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const handleChange = (_: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (currentDate) {
      onChange(currentDate);
    }
  };

  const currentColor = error ? "#FF0000" : color;
  const styles = getStyles(currentColor, labelError);

  const openPicker = () => {
    setShow(true);
  };

  if (date) {
    formatDate(date);
  }

  return (
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
        <TouchableOpacity style={styles.textInput} onPress={openPicker}>
          {!value ? (
            !labelError && (
              <StyledText color={theme.colors.secondary}>
                {placeholder}
              </StyledText>
            )
          ) : (
            <StyledText
              color={theme.colors.primary}
              style={{ fontWeight: "bold" }}
            >
              {formatDate(value)}
            </StyledText>
          )}
          <View style={styles.arrow} />
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, date) => handleChange(event, date)}
        />
      )}
    </View>
  );
}

const getStyles = (color: string, labelError: boolean) =>
  StyleSheet.create({
    root: {
      position: "relative",
    },
    visiblePlaceholder: {
      marginBottom: 8,
    },
    textInput: {
      position: "relative",
      width: 302,
      height: 40,
      borderWidth: 1,
      borderColor: labelError ? theme.colors.error : color,
      paddingHorizontal: 8,
      fontSize: 16,
      justifyContent: "center",
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
  });
