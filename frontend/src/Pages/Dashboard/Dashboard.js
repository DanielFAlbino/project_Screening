import { React, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CollectionsTable from "./components/Table/CollectionsTable/CollectionTable";
import CardsTable from "./components/Table/CardsTable/CardsTable";
import Navbar from "../../Components/NavBar/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { getUserId } from "../../Utils/localStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "40vh",
    },
  },
  table: {
    margin: "5vh",
    marginTop: "10vh",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const user = getUserId();
  const [collection, setCollection] = useState([]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Navbar />
      <Grid container direction="row" justify="center">
        <Grid item xs={12} lg={5} className={classes.table}>
          <CollectionsTable
            isAdmin={JSON.parse(user).isAdmin}
            userId={JSON.parse(user)._id}
            getCollections={setCollection}
          />
        </Grid>
        <Grid item xs={12} lg={5} className={classes.table}>
          <CardsTable
            isAdmin={JSON.parse(user).isAdmin}
            userId={JSON.parse(user)._id}
            collections={collection}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
