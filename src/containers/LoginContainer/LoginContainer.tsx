import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Message, TextInput } from "components/";
import { theme } from "theme/";
import { useThunkDispatch } from "hooks/";
import actions from "store/actions/";
import { useNavigation } from "@react-navigation/core";
import { MessageTypes } from "store/reducers/message";

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

function LoginContainer() {
  const navigation = useNavigation();
  const thunkDispatch = useThunkDispatch();
  const [values, setValues] = useState<LoginForm>(defaultValues);
  const [message, setMessage] = useState({ show: false, message: "" });

  const handleChangeValue = (key: string) => (value: string) => {
    setValues({ ...values, [key]: value });
  };

  const resetValues = () => setValues(defaultValues);

  const handleSubmit = async () => {
    thunkDispatch(actions.enableLoader());
    const { error, message } = await thunkDispatch(actions.login(values));
    if (error) {
      setMessage({ show: true, message });
    } else {
      navigation.navigate("Logged");
      resetValues();
    }
    thunkDispatch(actions.disableLoader());
  };

  return (
    <View style={styles.root}>
      <Message
        message={message.message}
        show={message.show}
        type={MessageTypes.Danger}
        onPress={() => setMessage({ ...message, show: false })}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo.webp")}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          keyboardType="email-address"
          label="Correo"
          color={theme.colors.secondary}
          value={values.email}
          style={styles.input}
          onChangeText={handleChangeValue("email")}
        />
        <TextInput
          label="Contraseña"
          color={theme.colors.secondary}
          value={values.password}
          style={styles.input}
          onChangeText={handleChangeValue("password")}
          onSubmitEditing={handleSubmit}
          secureTextEntry
        />
        <Button
          text="Entrar"
          styleText={{
            color: theme.colors.light,
            size: 2.5,
            children: "Entrar",
          }}
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
    backgroundColor: theme.colors.light,
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
    paddingTop: 24,
  },
  input: {
    marginBottom: 16,
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
