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

function SelectData({ collectionList, card, addedToCollection }) {
  const classes = useStyles();
  const [collectionId, setCollectionId] = useState("");
  let maxPerCard = 0;
  const onAdd = async (event) => {
    const coll = event.target.value;
    if (coll.cardsList) {
      if (coll.cardsList.length == 60) {
        addedToCollection(false);
        return alert("Collection limit reached!");
      }

      coll.cardsList.map((cards) => {
        if (cards._id === card._id) {
          return maxPerCard++;
        }
      });

      if (maxPerCard === 4) {
        addedToCollection(false);
        return alert(
          "You can only have 4 cards with the same name/number in your collection"
        );
      }
    }
    if (!coll.cardsList) {
      coll.cardsList = [];
    }
    coll.cardsList.push({ _id: card._id });
    const message = await update(coll._id, coll).then((res) => {
      return res.message;
    });
    alert(message);
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
          return <MenuItem value={row}>{row.collectionName}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

export default SelectData;
