// Base
import { React, useEffect, Suspense } from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
//routes
import Routes from "./routes/routes";
import Login from "./Pages/Login/Login";
import { getUserId } from "./Utils/localStorage";

function App() {
  const user = getUserId();
  const location = window.location.pathname;

  useEffect(() => {}, []);

  if (!user && location !== "/login") {
    return (
      <Suspense fallback={<CircularProgress />}>
        <Router>
          <Redirect to="/login" />
          <Route to="/login" component={Login} />
        </Router>
      </Suspense>
    );
  }

  return <Routes />;
}

export default App;
