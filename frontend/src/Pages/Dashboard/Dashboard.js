import { React, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CollectionsTable from "./components/Table/CollectionsTable/CollectionTable";
import CardsTable from "./components/Table/CardsTable/CardsTable";
import Navbar from "../../Components/NavBar/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { getUserId } from "../../Utils/localStorage";
import {
  getAllCollection,
  getCollectionByUser,
} from "../../Services/collection";
import { getAllCards, getCards } from "../../Services/card";
import { getUser } from "../../Services/user";

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

  const collectionHeader = ["Collection", "User", "Actions"];
  const cardHeader = ["#", "Name", "Description", "Added by", "Actions"];

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Navbar />
      <Grid container direction="row" justify="center">
        <Grid container xs={4} className={classes.table}>
          <CollectionsTable
            isAdmin={JSON.parse(user).isAdmin}
            titles={collectionHeader}
            userId={JSON.parse(user)._id}
          />
        </Grid>
        <Grid container xs={6} className={classes.table}>
          <CardsTable
            isAdmin={JSON.parse(user).isAdmin}
            titles={cardHeader}
            userId={JSON.parse(user)._id}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
