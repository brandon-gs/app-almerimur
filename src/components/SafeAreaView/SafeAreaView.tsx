import React from "react";
import { SafeAreaView as ReactSafeAreaView, StatusBar } from "react-native";

export default function SafeAreaView({ children }: SafeAreaViewProps) {
  StatusBar.setBackgroundColor("#FFF");
  return (
    <ReactSafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#FFF",
      }}
    >
      {children}
    </ReactSafeAreaView>
  );
}
