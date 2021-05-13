import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ChangePasswordContainer } from "containers/";

function ChangePasswordScreen() {
  return (
    <KeyboardAwareScrollView>
      <ChangePasswordContainer />
    </KeyboardAwareScrollView>
  );
}

export default ChangePasswordScreen;
