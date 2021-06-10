import React from "react";
import { SafeAreaView as ReactSafeAreaView, StatusBar } from "react-native";
import { theme } from "theme/";

export default function SafeAreaView({
  children,
  margin = false,
  style = {},
}: SafeAreaViewProps) {
  StatusBar.setBackgroundColor(theme.colors.primary);
  return (
    <ReactSafeAreaView
      style={[
        {
          flex: 1,
          marginTop: margin ? StatusBar.currentHeight : 0,
          kgroundColor: theme.colors.light,
        },
        style,
      ]}
    >
      {children}
    </ReactSafeAreaView>
  );
}
