import React from "react";
import { LoginContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { theme } from "theme/";

function LoginScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: theme.colors.light }}
    >
      <LoginContainer />
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;
