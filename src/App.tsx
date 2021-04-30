import React, { Fragment } from "react";
import { registerRootComponent } from "expo";
import { LoginScreen } from "screens/";

function App() {
  return (
    <Fragment>
      <LoginScreen />
    </Fragment>
  );
}

export default registerRootComponent(App);
