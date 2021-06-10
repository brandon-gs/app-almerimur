import React from "react";
import { theme } from "theme/";
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
} from "react-native";
import StyledText from "../StyledText";
import HeaderLogo from "../../../assets/Header.svg";
import Exit from "../../../assets/Exit.svg";
import { HeaderProps } from "./Header.types";

function Header({ name, logout }: HeaderProps) {
  StatusBar.setBackgroundColor(theme.colors.primary);
  return (
    <View style={styles.header}>
      {Platform.OS === "ios" ? (
        <SafeAreaView
          style={{ flex: 0, backgroundColor: theme.colors.primary }}
        ></SafeAreaView>
      ) : (
        <StatusBar backgroundColor={theme.colors.primary} />
      )}
      <HeaderLogo width={43} height={36} style={styles.logo} />
      <StyledText color={theme.colors.light} size={3} style={styles.title}>
        {name.substr(0, 16)}
      </StyledText>
      <View style={{ flexGrow: 1 }}></View>
      <Exit onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logo: {
    marginRight: 16,
  },
  title: {
    overflow: "visible",
    fontWeight: "bold",
  },
});

export default Header;
