import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { getUserId } from "../Utils/localStorage";
/* import AppBar from "Components/AppBar/AppBar"; */

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const user = getUserId();

  return (
    <Router>
      <Route
        {...rest}
        render={(props) => {
          return user ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          );
        }}
      />
    </Router>
  );
};
export default PrivateRoute;
