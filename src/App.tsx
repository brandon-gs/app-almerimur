import React from "react";
// Redux
import { Provider } from "react-redux";
import { store, persistor } from "store/";
import { PersistGate } from "redux-persist/integration/react";
// Expo config
import { registerRootComponent } from "expo";
// Screens
import { HomeScreen, LoginScreen } from "screens/";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

enum Routes {
  Home = "Home",
  Login = "Login",
}

function App() {
  const hasAuth = store.getState().user.token;
  const initialRoute = hasAuth ? Routes.Home : Routes.Login;

  const renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={renderLoading()}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name={Routes.Login}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name={Routes.Home} component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default registerRootComponent(App);
