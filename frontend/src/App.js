// Base
import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <BrowserRouter>
      <Switch>
        <Route>
          {token ? (
            <Redirect to="/dashboard" />
          ) : (
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
