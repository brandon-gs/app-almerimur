import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Background, Button, ListWorks } from "components/";
import { theme } from "theme/";
import { useNavigation } from "@react-navigation/core";

const data: Array<WorkProps> = [
  {
    _id: "1",
    enabled: true,
    title: "Trabajo 1",
  },
  {
    _id: "2",
    enabled: false,
    title: "Trabajo 2",
  },
];

function HomeContainer() {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Background />
      <ScrollView style={{ flex: 1 }}>
        <ListWorks works={data} />
      </ScrollView>
      <Button
        text="Crear un nuevo trabajo"
        styleText={{
          style: { fontWeight: "bold" },
          color: theme.colors.light,
          size: 2.5,
          children: "Crear un nuevo trabajo",
        }}
        style={styles.button}
        onPress={() => navigate("CreateWork")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    width: 302,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 32,
  },
});

export default HomeContainer;
