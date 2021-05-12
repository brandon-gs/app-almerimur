import React from "react";
import { ProfileContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ProfileScreen() {
  return (
    <KeyboardAwareScrollView>
      <ProfileContainer />
    </KeyboardAwareScrollView>
  );
}

export default ProfileScreen;
