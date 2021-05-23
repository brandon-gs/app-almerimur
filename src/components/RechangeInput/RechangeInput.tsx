import React, { useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import TextInputCustom from "../TextInput";
import { ITextInputProps } from "../TextInput/TextInput.types";
import Add from "assets/Add.svg";

interface Props {
  index: number;
  editable?: boolean;
  textInput: ITextInputProps;
  numberInput: ITextInputProps;
  onPressAdd: () => void;
  errors: RechangeWorkFormError[];
  style: ViewStyle;
  showAdd: boolean;
}

export default function RechangeInput({
  index,
  editable = true,
  textInput,
  numberInput,
  onPressAdd,
  errors,
  style,
  showAdd,
}: Props) {
  const [onFocus, setOnFocus] = useState(false);
  const [onFocusNumber, setOnFocusNumber] = useState(false);

  const showTopLabel = Boolean(
    textInput.value || numberInput.value || onFocus || onFocusNumber
  );

  const errorText = errors[index] ? errors[index].title : false;
  const errorNumber = errors[index] ? errors[index].number : false;

  return (
    <View style={[styles.root, style]}>
      <TextInputCustom
        {...textInput}
        editable={editable}
        width={158}
        style={styles.inputText}
        labelAlign="left"
        showTopLabel={showTopLabel}
        labelError={errorText}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
      />
      <TextInputCustom
        {...numberInput}
        editable={editable}
        width={75}
        style={styles.inputNumber}
        keyboardType="numeric"
        labelAlign="left"
        labelError={errorNumber}
        showTopLabel={showTopLabel}
        onFocus={() => setOnFocusNumber(true)}
        onBlur={() => setOnFocusNumber(false)}
      />
      {showAdd && (
        <View style={showTopLabel ? { marginTop: 32 } : {}}>
          <Add onPress={editable ? onPressAdd : () => {}} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 302,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputText: {
    marginRight: 24,
  },
  inputNumber: {
    marginRight: 16,
  },
});
