import React from "react";
import { LoginContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { theme } from "theme/";
import { SafeAreaView } from "components/";
import {
  Platform,
  SafeAreaView as SafeAreaNative,
  StatusBar,
  View,
} from "react-native";

function LoginScreen() {
  return (
    <>
      {Platform.OS === "ios" ? (
        <SafeAreaNative
          style={{ flex: 0, backgroundColor: theme.colors.primary }}
        ></SafeAreaNative>
      ) : (
        <StatusBar backgroundColor={theme.colors.primary} />
      )}
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            backgroundColor: theme.colors.light,
          }}
        >
          <LoginContainer />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

export default LoginScreen;
