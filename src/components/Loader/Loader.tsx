import React from "react";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { useSelector } from "react-redux";
import { theme } from "theme/";

export default function Loader() {
  const { isVisible } = useSelector((state) => state.loader);

  const sizeLoader = Platform.OS === "android" ? 80 : "large";

  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <ActivityIndicator
        focusable={false}
        color={theme.colors.background}
        size={sizeLoader}
      />
    </Overlay>
  );
}

const TRANSPARENT = "rgba(0,0,0,0)";

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: TRANSPARENT,
    shadowColor: TRANSPARENT,
    elevation: 0,
    shadowOpacity: 0,
  },
  loader: {},
});
