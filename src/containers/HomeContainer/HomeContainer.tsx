import React from "react";
import { StyleSheet, View } from "react-native";
import { Background, Button, ListWorks } from "components/";
import { theme } from "theme/";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { useThunkDispatch } from "hooks/";
import actions from "store/actions";

function HomeContainer() {
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const { navigate } = useNavigation();

  const {
    user: { token, user_role },
    loader: { isVisible },
    works,
  } = useSelector((state) => state);

  React.useEffect(() => {
    const getWorks = async () => {
      if (user_role === "Conductor") {
        await thunkDispatch(actions.getDriverWorks(token));
      } else {
        console.log("Do api call to get mechanic works");
      }
    };
    getWorks();
  }, []);

  if (isVisible) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Background />
      <ListWorks works={works} />
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
