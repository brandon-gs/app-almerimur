import React from "react";
import { StyleSheet, View } from "react-native";
import { Background, Button, ListWorks, StyledText } from "components/";
import { theme } from "theme/";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "hooks/";
import actions from "store/actions";

function HomeContainer() {
  const thunkDispatch = useThunkDispatch();
  const { navigate } = useNavigation();

  const {
    user: { token, user_role },
    loader: { isVisible },
    works: { works },
  } = useSelector((state) => state);

  const getWorks = async () => {
    thunkDispatch(actions.enableLoader());
    if (user_role === "Conductor") {
      await thunkDispatch(actions.getDriverWorks(token));
    } else {
      await thunkDispatch(actions.getMechanicWorks(token));
    }
    thunkDispatch(actions.disableLoader());
  };

  React.useEffect(() => {
    getWorks();
  }, []);

  if (isVisible) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Background />
      {works.length > 0 ? (
        <ListWorks works={works} getWorks={getWorks} />
      ) : (
        <View style={styles.message}>
          <StyledText size={3.5} align="center" color={theme.colors.secondary}>
            No tienes trabajos creados
          </StyledText>
        </View>
      )}
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
  message: {
    height: "75%",
    marginTop: 32,
  },
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
