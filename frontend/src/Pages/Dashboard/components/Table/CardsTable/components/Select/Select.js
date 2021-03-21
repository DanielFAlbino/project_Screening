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

  const onAdd = async (event) => {
    const coll = event.target.value;

    const data = {
      _id: card._id,
      name: card.name,
      cardNumber: card.cardNumber,
      description: card.description,
    };

    coll.cardsList.push(data);

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
