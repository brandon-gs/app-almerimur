import React from "react";
import { View } from "react-native";
import { Background, SelectInput, StyledText } from "components/";

function CreateWork() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", alignItems: "center" }}>
      <Background />
      <StyledText>Create Work</StyledText>
      <SelectInput />
    </View>
  );
}

export default CreateWork;
