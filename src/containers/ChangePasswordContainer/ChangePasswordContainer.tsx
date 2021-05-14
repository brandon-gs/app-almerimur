import React, { useState } from "react";
import { Button, StyledText, TextInput } from "components/";
import { StyleSheet, View } from "react-native";
import { theme } from "theme/";
import PasswordIcon from "assets/Password.svg";
import actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { MessageTypes } from "store/reducers/message";

interface ChangePasswordValues {
  newPassword: string;
  confirmNewPassword: string;
}

const defaultValues: ChangePasswordValues = {
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordContaier() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { show } = useSelector((state) => state.message);
  const [values, setValues] = useState<ChangePasswordValues>(defaultValues);

  const handleChangeValue = (key: keyof ChangePasswordValues) => (
    value: string
  ) => {
    setValues({ ...values, [key]: value });
    // If message is visible, hide it
    if (show) {
      dispatch(actions.hideGlobalMessage());
    }
  };

  const handleSubmit = async () => {
    dispatch(actions.enableLoader());
    // Validate password
    const matchPassword = values.newPassword === values.confirmNewPassword;

    if (!matchPassword) {
      dispatch(
        actions.updateGlobalMessage({
          message: "Las contraseñas no coinciden",
          show: true,
          type: MessageTypes.Danger,
        })
      );
      dispatch(actions.disableLoader());
      return;
    }

    // Do request to change password
    const { error, message } = await actions.changePassword(
      values.newPassword,
      token
    );
    dispatch(
      actions.updateGlobalMessage({
        message,
        show: true,
        type: !error ? MessageTypes.Success : MessageTypes.Danger,
      })
    );
    setValues(defaultValues);
    dispatch(actions.disableLoader());
  };

  return (
    <View style={styles.root}>
      <StyledText color={theme.colors.primary} size={4} style={styles.title}>
        Cambiar contraseña
      </StyledText>
      <View style={styles.icon}>
        <PasswordIcon fill={theme.colors.primary} />
      </View>
      <TextInput
        secureTextEntry
        style={styles.input}
        label="Contraseña nueva"
        value={values.newPassword}
        onChangeText={handleChangeValue("newPassword")}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        label="Confirmar contraseña nueva"
        value={values.confirmNewPassword}
        onChangeText={handleChangeValue("confirmNewPassword")}
        onSubmitEditing={handleSubmit}
      />
      <Button
        text="Actualizar"
        disabled={!Boolean(values.newPassword && values.confirmNewPassword)}
        onPress={handleSubmit}
        style={styles.button}
        styleText={{
          size: 2.5,
          children: "",
          color: theme.colors.light,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 32,
    textAlign: "center",
    marginBottom: 32,
  },
  icon: {
    marginBottom: 40,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: theme.colors.primary,
    width: 302,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
