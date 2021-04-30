import React from "react";
import { SafeAreaView as ReactSafeAreaView, StatusBar } from "react-native";

export default function SafeAreaView({ children }: SafeAreaViewProps) {
  return (
    <ReactSafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      {children}
    </ReactSafeAreaView>
  );
}
