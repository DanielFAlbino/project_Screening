// Base
import { React, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";

//routes
import Routes from "./routes/routes";

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
  }, []);

  return <Routes />;
}

export default App;
