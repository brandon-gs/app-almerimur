import React from "react";
import { SafeAreaView } from "components/";
import { LoginContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView>
        <LoginContainer />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;
