import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyledTab } from "components/";
import {
  ChangePasswordScreen,
  CreateWorkScreen,
  HistoryScreen,
  HomeScreen,
  ProfileScreen,
} from "screens/";
import { Route } from "@react-navigation/routers";

export enum Routes {
  Home = "Home",
  CreateWork = "CreateWork",
  Login = "Login",
  History = "History",
  Profile = "Profile",
  ChangePassword = "ChangePassword",
}

const Tab = createBottomTabNavigator();

function LoggedTab() {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      tabBar={(props) => <StyledTab {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: { position: "absolute" },
      }}
    >
      <Tab.Screen
        name={Routes.Profile}
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil", tabBarVisible: true }}
      />
      <Tab.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{ tabBarLabel: "Home", tabBarVisible: true }}
      />
      <Tab.Screen
        name={Routes.History}
        component={HistoryScreen}
        options={{ tabBarLabel: "Histórico", tabBarVisible: true }}
      />
      <Tab.Screen
        name={Routes.CreateWork}
        component={CreateWorkScreen}
        options={{ tabBarLabel: "CrearWork", tabBarVisible: false }}
      />
      <Tab.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScreen}
        options={{ tabBarLabel: "Histórico", tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}

export default LoggedTab;
