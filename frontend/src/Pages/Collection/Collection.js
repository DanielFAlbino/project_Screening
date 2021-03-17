import { React, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { getCollection } from "../../Services/collection";

import TextField from "@material-ui/core/TextField";

import Table from "./components/Table/Table";

function Collection(props) {
  const collection = props.match.params.collectionId;
  const [collections, setCollections] = useState([]);
  const [formData, setFormData] = useState({
    collectionName: "",
    cardsList: [],
  });

  const handleCollection = async () => {
    const data = await getCollection(collection).then((res) => {
      return res;
    });
    setCollections(data.collections);
    setFormData({ collectionName: collections.collectionName });
  };

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    handleCollection();
  }, [collection, formData]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <TextField
        name="collectionName"
        type="text"
        onChange={handleChange("collectionName")}
        value={formData.collectionName}
      />
      <Table cards={collections.cardsList} setCardsLis={formData} />
    </Grid>
  );
}

export default Collection;
