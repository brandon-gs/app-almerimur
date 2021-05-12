import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "theme/";
import StyledText from "../StyledText";

function Work({ title, enabled }: WorkProps) {
  const styleRoot = enabled ? styles.enabled : styles.disabled;
  const styleText = enabled ? styles.textEnabled : styles.textDisabled;

  return (
    <TouchableOpacity
      disabled={!enabled}
      style={[styles.defaultRoot, styleRoot]}
    >
      <StyledText style={styleText} size={2.1}>
        {title}
      </StyledText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultRoot: {
    width: 302,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  enabled: {
    backgroundColor: theme.colors.light,
  },
  disabled: {
    backgroundColor: "#C3C9CC",
  },
  textEnabled: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  textDisabled: {
    fontWeight: "bold",
    color: theme.colors.light,
  },
});

export default Work;
