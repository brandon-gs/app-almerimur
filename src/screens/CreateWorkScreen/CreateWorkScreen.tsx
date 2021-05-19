import React from "react";
import { CreateWorkContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Background } from "components/";

function CreateWorkScreen() {
  return (
    <>
      <Background />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <CreateWorkContainer />
      </KeyboardAwareScrollView>
    </>
  );
}

export default CreateWorkScreen;
