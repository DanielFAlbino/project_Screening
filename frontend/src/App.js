// Base
import { React, useEffect } from "react";
import { Redirect } from "react-router-dom";

//routes
import Routes from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";

import { getUserId } from "./Utils/localStorage";

function App() {
  const user = getUserId();
  const location = window.location.pathname;

  useEffect(() => {
    if (user && location === "/login") {
      return <Redirect to="/dashboard" />;
    }

    if (!user && location !== "/login") {
      return <Redirect to="/login" />;
    }
  }, [location, user]);

  return (
    <PrivateRoute>
      <Routes />
    </PrivateRoute>
  );
}

export default App;
