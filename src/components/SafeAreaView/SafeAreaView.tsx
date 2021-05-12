import React from "react";
import { SafeAreaView as ReactSafeAreaView, StatusBar } from "react-native";

export default function SafeAreaView({
  children,
  margin = true,
}: SafeAreaViewProps) {
  StatusBar.setBackgroundColor("#FFF");
  return (
    <ReactSafeAreaView
      style={{
        flex: 1,
        marginTop: margin ? StatusBar.currentHeight : 0,
        backgroundColor: "#FFF",
      }}
    >
      {children}
    </ReactSafeAreaView>
  );
}
