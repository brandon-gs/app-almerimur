import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ChangePasswordContainer } from "containers/";
import { theme } from "theme/";

function ChangePasswordScreen() {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: theme.colors.light }}
    >
      <ChangePasswordContainer />
    </KeyboardAwareScrollView>
  );
}

export default ChangePasswordScreen;
