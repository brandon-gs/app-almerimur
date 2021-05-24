import React from "react";
import { theme } from "theme/";
import { StyleSheet, View } from "react-native";
import StyledText from "../StyledText";
import HeaderLogo from "../../../assets/Header.svg";
import Exit from "../../../assets/Exit.svg";
import { HeaderProps } from "./Header.types";

function Header({ name, logout }: HeaderProps) {
  return (
    <View style={styles.header}>
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
