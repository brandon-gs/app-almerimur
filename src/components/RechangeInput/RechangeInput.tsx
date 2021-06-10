import React, { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import TextInputCustom from "../TextInput";
import { ITextInputProps } from "../TextInput/TextInput.types";
import Add from "../../../assets/Add.svg";
import SelectInput from "../SelectInput";
import { useSelector } from "react-redux";
import { SelectInputProps } from "../SelectInput/SelectInput";

interface Props {
  index: number;
  editable?: boolean;
  textInput: SelectInputProps;
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
  const { rechanges } = useSelector((state) => state);

  const [showOptions, setShowOptions] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [onFocusNumber, setOnFocusNumber] = useState(false);

  const showTopLabel = Boolean(
    textInput.value || numberInput.value || onFocus || onFocusNumber
  );

  const errorText = errors[index] ? errors[index].title : false;
  const errorNumber = errors[index] ? errors[index].number : false;

  const changeOptions = (value: boolean) => setShowOptions(value);

  return (
    <>
      <View style={[styles.root, style]}>
        <SelectInput
          {...textInput}
          editable={editable}
          width={158}
          options={rechanges}
          placeholder="Recambios"
          value={textInput.value}
          style={styles.inputText}
          labelError={errorText}
          showItems={showOptions}
          onPress={() => changeOptions(true)}
          onPressOption={() => changeOptions(false)}
          onFocus={() => setOnFocus(true)}
          position={{ top: -200, left: -80 }}
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
      {showOptions && (
        <Pressable
          style={{
            position: "absolute",
            top: -200,
            left: 0,
            width: "100%",
            height: "200%",
            zIndex: 1000,
          }}
          onPress={() => changeOptions(false)}
        />
      )}
    </>
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
    marginTop: 4,
    marginRight: 24,
  },
  inputNumber: {
    marginRight: 16,
  },
});
