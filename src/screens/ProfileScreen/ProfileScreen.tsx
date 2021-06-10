import React from "react";
import { ProfileContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ProfileScreen() {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ProfileContainer />
    </KeyboardAwareScrollView>
  );
}

export default ProfileScreen;
