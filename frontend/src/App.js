// Base
import { React } from "react";

//routes
import Routes from "./routes/routes";
import { Redirect } from "react-router-dom";
//components
import NavBar from "./Components/NavBar/NavBar";
import { getJwt } from "./Utils/jwt";

//Material UI components
import Grid from "@material-ui/core/Grid";

function App() {
  const TOKEN = getJwt();
  if (!TOKEN) return <Redirect to="/login" />;
  return (
    <Grid>
      <NavBar />
      <Routes />
    </Grid>
  );
}

export default App;
