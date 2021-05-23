import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyledTab } from "components/";
import {
  ChangePasswordScreen,
  CreateMWorkScreen,
  CreateWorkScreen,
  EditDriverWork,
  EditMechanicWork,
  FinishedScreen,
  HistoryScreen,
  HomeScreen,
  ProfileScreen,
  ReadDriverWork,
  ReadMechanicWork,
} from "screens/";
import { useSelector } from "react-redux";

export enum Routes {
  Home = "Home",
  CreateWork = "CreateWork",
  EditDriverWork = "EditDriverWork",
  Login = "Login",
  History = "History",
  Profile = "Profile",
  ChangePassword = "ChangePassword",
  FinishStep = "FinishStep",
  ReadDriverWork = "ReadDriverWork",
}

const Tab = createBottomTabNavigator();

function LoggedTab() {
  const {
    user: { user_role },
  } = useSelector((state) => state);

  const CreateWork =
    user_role === "Conductor" ? CreateWorkScreen : CreateMWorkScreen;

  const EditWork =
    user_role === "Conductor" ? EditDriverWork : EditMechanicWork;

  const ReadWork =
    user_role === "Conductor" ? ReadDriverWork : ReadMechanicWork;

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
        options={{
          tabBarLabel: "Home",
          tabBarVisible: true,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Routes.History}
        component={HistoryScreen}
        options={{
          tabBarLabel: "Histórico",
          tabBarVisible: true,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Routes.ReadDriverWork}
        component={ReadWork}
        initialParams={{
          title: "",
          work: null,
        }}
        options={{
          tabBarLabel: "ReadWork",
          tabBarVisible: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Routes.CreateWork}
        component={CreateWork}
        options={{
          tabBarLabel: "CrearWork",
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name={Routes.EditDriverWork}
        component={EditWork}
        options={{
          tabBarLabel: "EditDriverWork",
          tabBarVisible: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Routes.FinishStep}
        component={FinishedScreen}
        initialParams={{ message: "Mensaje por defecto" }}
        options={{
          tabBarLabel: "FinishedScreen",
          tabBarVisible: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScreen}
        options={{ tabBarLabel: "Cambiar contraseña", tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}

export default LoggedTab;
