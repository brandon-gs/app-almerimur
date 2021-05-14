import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import actions from "store/actions";
// Screens
// Navigation
import { createStackNavigator } from "@react-navigation/stack";
// Components
import { Header } from "components/";
import { theme } from "theme/";
// Const
import { Routes } from "../LoggedTab";
import HomeScreen from "screens/HomeScreen";
import HistoryScreen from "screens/HistoryScreen";
import ProfileScreen from "screens/ProfileScreen";

const Stack = createStackNavigator();

export default function RootNavigation() {
  const dispatch = useDispatch();
  const { user_name } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(actions.enableLoader());
    dispatch(actions.logout());
    dispatch(actions.disableLoader());
  };

  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerStyle: {
          height: 88,
          backgroundColor: theme.colors.secondary,
        },
        headerTitle: (props) => (
          <Header
            name={user_name ? user_name : " "}
            logout={handleLogout}
            {...props}
          />
        ),
      }}
    >
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.History} component={HistoryScreen} />
      <Stack.Screen name={Routes.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
