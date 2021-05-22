import React from "react";
import { LoginContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { theme } from "theme/";
import { SafeAreaView } from "components/";

function LoginScreen() {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: theme.colors.light }}
      >
        <LoginContainer />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
