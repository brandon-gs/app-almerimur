import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, TextInput } from "components/";
import { theme } from "theme/";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

function LoginContainer() {
  const [values, setValues] = useState<LoginForm>(defaultValues);

  const handleChangeValue = (key: string) => (value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = () => {
    // TODO: Do api call
    console.log("submit values");
    console.log(values);
    // TODO: set errors
  };

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image source={require("assets/logo.webp")} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textField}
          label="Correo"
          color={theme.colors.secondary}
          value={values.email}
          onChangeText={handleChangeValue("email")}
        />
        <TextInput
          style={styles.textField}
          label="Contraseña"
          color={theme.colors.secondary}
          value={values.password}
          onChangeText={handleChangeValue("password")}
          onSubmitEditing={handleSubmit}
        />
        <Button
          text="Entrar"
          styleText={{ color: theme.colors.light, size: 2.5 }}
          style={styles.button}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  logoContainer: {
    height: "55%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 240,
    height: 150,
  },
  formContainer: {
    height: "45%",
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    paddingTop: 40,
  },
  textField: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    width: 170,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default LoginContainer;
