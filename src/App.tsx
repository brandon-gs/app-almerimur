import React, { useEffect, useRef } from "react";
// Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "store/";
import { PersistGate } from "redux-persist/integration/react";
// Expo config
import { registerRootComponent } from "expo";
// Components
import { ActivityIndicator, Platform, View } from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { Header } from "components/";
// Navigations
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import LoggedTab from "./navigation/LoggedTab";
// Theme
import { theme } from "./theme";
// Actions
import actions from "store/actions";
// Permissions
import * as ImagePicker from "expo-image-picker";
import Loader from "./components/Loader";

const Stack = createStackNavigator();

function App() {
  /** Get permissions to use Gallery */
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Lo sentimos, necesitamos permisos de la galeria para que la aplicación funcione correctamente."
          );
        }
      }
    })();
  }, []);

  const renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={renderLoading()}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

function RootNavigation() {
  const dispatch = useDispatch();
  const navigation = useRef<NavigationContainerRef>(null);
  const { token, name } = useSelector((state) => state.user);

  const handleLogout = () => {
    if (navigation.current) {
      dispatch(actions.enableLoader());
      navigation.current.navigate("Home");
      dispatch(actions.hideGlobalMessage());
      dispatch(actions.logout());
      navigation.current.navigate("Login");
      dispatch(actions.disableLoader());
    }
  };

  const initialRoute = Boolean(token) ? "Logged" : "Login";

  return (
    <>
      <Loader />
      <NavigationContainer ref={navigation}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerStyle: {
              height: 88,
              backgroundColor: theme.colors.secondary,
            },
            headerTitle: (props) => (
              <Header
                name={name ? name : "Default"}
                logout={handleLogout}
                {...props}
              />
            ),
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Logged" component={LoggedTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default registerRootComponent(App);
