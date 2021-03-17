import { React, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Table } from "./components";

import { makeStyles } from "@material-ui/core/styles";
import { getUser } from "../../Utils/localStorage";
import { getCollection, getAllCollection } from "../../Services/collection";
import { getAllCards, getCards } from "../../Services/card";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "40vh",
    },
  },
  table: {
    margin: "10px",
    marginTop: "2%",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const user = getUser();
  const [collection, setCollection] = useState([]);
  const [card, setCard] = useState([]);
  const [collectionKeys, setCollectionKeys] = useState([]);
  const [collectionValues, setCollectionValues] = useState([]);
  const [cardKeys, setCardKeys] = useState([]);
  const [cardvalues, setCardValues] = useState([]);

  const collections = async () => {
    const userId = JSON.parse(user)._id;
    let data;
    if (JSON.parse(user).isAdmin) {
      data = await getAllCollection().then((res) => {
        return res.collections;
      });
    } else {
      data = await getCollection(userId).then((res) => {
        return res.collections;
      });
    }
    setCollectionKeys(Object.keys(data[0]));
    let arr1 = [];
    data.map((arr) => {
      arr1.push(Object.values(arr));
    });

    setCollectionValues(arr1);
    setCollection(data);
    return;
  };

  const cards = async () => {
    const userId = JSON.parse(user)._id;
    let data;
    if (JSON.parse(user).isAdmin) {
      data = await getAllCards().then((res) => {
        return res.cards;
      });
    } else {
      data = await getCards(userId).then((res) => {
        return res.cards;
      });
    }
    setCardKeys(Object.keys(data[0]));

    let arr1 = [];
    data.map((arr) => {
      arr1.push(Object.values(arr));
    });
    setCardValues(arr1);
    return;
  };

  useEffect(() => {
    collections();
    cards();
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid xs={3} className={classes.table}>
        <Table data={collectionValues} titles={collectionKeys} />
      </Grid>
      <Grid xs={8} className={classes.table}>
        <Table data={card} titles={cardKeys} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
