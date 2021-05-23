import React from "react";
import { CreateMWorkContainer } from "containers/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Background } from "components/";

function CreateWorkScreen() {
  return (
    <>
      <Background />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <CreateMWorkContainer />
      </KeyboardAwareScrollView>
    </>
  );
}

export default CreateWorkScreen;
