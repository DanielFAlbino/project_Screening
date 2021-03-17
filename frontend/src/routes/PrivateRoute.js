import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../Utils/localStorage";
import AppBar from "Components/AppBar/AppBar";
const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const user = getUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        return Boolean(user) && user?.role >= role ? (
          <AppBar>
            <Component {...props} />
          </AppBar>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};
export default PrivateRoute;
