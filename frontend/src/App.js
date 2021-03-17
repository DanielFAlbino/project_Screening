// Base
import { React } from "react";

//routes
import Routes from "./routes/routes";

//components
import NavBar from "./Components/NavBar/NavBar";

//Material UI components
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <Grid>
      <NavBar />
      <Routes />
    </Grid>
  );
}

export default App;
