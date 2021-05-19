import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { theme } from "theme/";
import Button from "../Button";
import StyledText from "../StyledText";

function Modal() {
  const { isOpen, onAccept, onDecline } = useSelector((state) => state.modal);

  return isOpen ? (
    <View style={styles.root}>
      <StyledText color={theme.colors.error} style={styles.message}>
        No has rellenado los campos en rojo, ¿Estás seguro que quieres
        continuar?
      </StyledText>
      <View style={styles.buttonContainers}>
        <Button
          text="No"
          onPress={() => onDecline()}
          style={styles.buttonReject}
          styleText={{ color: theme.colors.primary, size: 2.5, children: "Si" }}
        />
        <Button
          text="Si"
          onPress={async () => await onAccept()}
          style={styles.buttonAccept}
          styleText={{ color: theme.colors.light, size: 2.5, children: "Si" }}
        />
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    height: 176,
    backgroundColor: theme.colors.light,
    bottom: 55,
    justifyContent: "center",
    left: 0,
    padding: 16,
    borderTopColor: theme.colors.secondary,
    borderTopWidth: 0.3,
    zIndex: 10,
  },
  message: {
    textAlign: "center",
  },
  buttonContainers: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonAccept: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: theme.colors.primary,
    width: 94,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonReject: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: theme.colors.light,
    width: 94,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default Modal;
