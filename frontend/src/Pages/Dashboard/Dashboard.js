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
  const [collectionValues, setCollectionValues] = useState([]);
  const [cardValues, setCardValues] = useState([]);

  const collectionHeader = ["Collection", "User", "Actions"];
  const cardHeader = ["Name", "Description", "Added by", "Actions"];

  const onGetUser = async (userId) => {
    const user = await getUser(userId).then((res) => {
      return res.username;
    });

    return user;
  };

  const collections = async () => {
    const userId = JSON.parse(user)._id;
    let data;
    let arr1 = [];

    if (JSON.parse(user).isAdmin) {
      data = await getAllCollection().then((res) => {
        return res.collections;
      });
    } else {
      data = await getCollectionByUser(userId).then((res) => {
        return res.collections;
      });
    }
    if (data.length > 1) {
      data.map((arr) => {
        arr1.push(Object.values(arr));
      });
      arr1.map((row) => {
        getUser(row[3]).then((res) => {
          row.push(res);
        });
      });
    } else {
      arr1.push(Object.values(data[0]));
    }
    data.map((arr) => {
      arr1.push(Object.values(arr));
    });
    setCollectionValues(arr1);

    return;
  };

  const cards = async () => {
    const userId = JSON.parse(user)._id;
    let data;
    let arr1 = [];

    if (JSON.parse(user).isAdmin) {
      data = await getAllCards().then((res) => {
        return res.cards;
      });
    } else {
      data = await getCards(userId).then((res) => {
        return res.cards;
      });
    }

    if (data.length > 1) {
      data.map((arr) => {
        arr1.push(Object.values(arr));
      });
      arr1.map((row) => {
        getUser(row[3]).then((res) => {
          row.push(res);
        });
      });
    } else {
      arr1.push(Object.values(data[0]));
    }
    setCardValues(arr1);
  };

  useEffect(() => {
    collections();
    cards();
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Navbar />
      <Grid container direction="row" justify="center">
        <Grid container xs={4} className={classes.table}>
          <CollectionsTable
            isAdmin={JSON.parse(user).isAdmin}
            data={collectionValues}
            titles={collectionHeader}
          />
        </Grid>
        <Grid container xs={6} className={classes.table}>
          <CardsTable
            isAdmin={JSON.parse(user).isAdmin}
            data={cardValues}
            titles={cardHeader}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
