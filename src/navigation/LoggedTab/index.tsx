import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyledTab } from "components/";
import {
  CreateWorkScreen,
  HistoryScreen,
  HomeScreen,
  ProfileScreen,
} from "screens/";

export enum Routes {
  Home = "Home",
  CreateWork = "CreateWork",
  Login = "Login",
  History = "History",
  Profile = "Profile",
}

const Tab = createBottomTabNavigator();

function LoggedTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <StyledTab {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: { position: "absolute" },
      }}
      initialRouteName={Routes.Home}
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
        name={Routes.CreateWork}
        component={CreateWorkScreen}
        options={{ tabBarLabel: "CrearWork", tabBarVisible: false }}
      />
      <Tab.Screen
        name={Routes.History}
        component={HistoryScreen}
        options={{ tabBarLabel: "Histórico", tabBarVisible: true }}
      />
    </Tab.Navigator>
  );
}

export default LoggedTab;
