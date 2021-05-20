import { useNavigation } from "@react-navigation/core";
import { Background, Button, StyledText } from "components/";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { theme } from "theme/";

export default function FinishedScreen(props: any) {
  const navigation = useNavigation();
  const { message } = props.route.params ? props.route.params : { message: "" };

  return (
    <>
      <Background />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.root}>
          <View style={styles.paper}>
            <StyledText
              size={3.75}
              color={theme.colors.secondary}
              style={styles.message}
            >
              {message}
            </StyledText>
          </View>
          <Button
            text="Volver"
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
            styleText={{
              size: 2.5,
              color: theme.colors.light,
              children: "Volver",
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    width: 231,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: 302,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  paper: {
    backgroundColor: theme.colors.light,
    width: 302,
    height: 330,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 56,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
