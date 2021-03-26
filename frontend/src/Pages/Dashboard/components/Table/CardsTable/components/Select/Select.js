import { React, useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { update } from "../../../../../../../Services/collection";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectData({
  collectionList,
  card,
  addedToCollection,
  onOpenAlert,
  alertMessage,
  alertMessageColor,
}) {
  const classes = useStyles();
  const [collectionId, setCollectionId] = useState("");

  let maxPerCard = 0;

  const onAdd = async (event) => {
    event.preventDefault();
    const coll = event.target.value;
    setCollectionId(coll._id);
    if (coll.cardsList) {
      if (coll.cardsList.length == 60) {
        addedToCollection(false);
        alertMessage("Collection limit reached!");
        alertMessageColor("error");
        onOpenAlert(true);
      }
      coll.cardsList.map((cards) => {
        if (cards._id === card._id) {
          return maxPerCard++;
        }
      });

      if (maxPerCard === 4) {
        addedToCollection(false);
        alertMessage(
          "You can only have 4 cards with the same name/number in your collection"
        );
        alertMessageColor("error");
        onOpenAlert(true);
      }
    }

    if (!coll.cardsList) {
      coll.cardsList = [];
    }
    coll.cardsList.push({ _id: card._id });

    const data = {
      collectionName: coll.collectionName,
      cardsList: coll.cardsList,
    };
    await update(coll._id, data)
      .then((res) => {
        alertMessage("Card added to collection");
        alertMessageColor("success");
        onOpenAlert(true);
      })
      .catch((error) => {
        alertMessage(error.response.data.message);
        alertMessageColor("error");
        onOpenAlert(true);
      });
    addedToCollection(false);
  };

  useEffect(() => {}, []);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Collections</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={collectionId}
        onChange={onAdd}
      >
        {collectionList.map((row) => {
          if (row.userId == card.userId) {
            return <MenuItem value={row}>{row.collectionName}</MenuItem>;
          }
        })}
      </Select>
    </FormControl>
  );
}

export default SelectData;
