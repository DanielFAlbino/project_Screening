import { React, useEffect, useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { register, getCollection, update } from "../../Services/collection";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import Table from "./components/Table/Table";

import { getUserId } from "../../Utils/localStorage";
import Navbar from "../../Components/NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100vh",
      marginTop: "30vh",
    },
  },
  btn: {
    margin: "10px",
    marginTop: "40px",
    width: "40vh",
    height: "40px",
  },
  Area: {
    margin: "10px",
    width: "90vh",
  },
  table: {
    minWidth: "100vh",
    marginTop: "0px",
    parrdingTop: "0px",
  },
}));

function Collection(props) {
  const classes = useStyles();
  const collection = props.match.params.collectionId;
  const [collections, setCollections] = useState([]);
  const [formData, setFormData] = useState({
    collectionName: "",
    cardsList: [],
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const goBack = useCallback(() => history.push("/"), [history]);

  const handleGetCollection = async () => {
    const data = await getCollection(collection).then((res) => {
      return res;
    });
    setCollections(data.collections);
    setFormData({ collectionName: collections.collectionName });
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const user = JSON.parse(getUserId());
    let message;
    formData.userId = user._id;
    if (!formData.collectionName.trim()) {
      setIsSubmitting(false);
      return setMessage("All fields are required");
    }

    if (collection) {
      message = await update(formData._id, formData).then((res) => {
        return res.message;
      });
      setIsSubmitting(false);
      setMessage(message);
      return;
    }
    message = await register(formData).then((res) => {
      return res.message;
    });

    setMessage(message);
    setIsSubmitting(false);
  };

  const handleChange = (name) => (event) => {
    setMessage("");
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    if (collection) handleGetCollection();
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Navbar />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(formData)}
      >
        <Grid>
          <TextField
            name="collectionName"
            label="collection name"
            type="text"
            onChange={handleChange("collectionName")}
            value={formData.collectionName}
          />
        </Grid>
        <Grid container lg={10}>
          <Table cards={collections.cardsList} setCardsLis={formData} />
        </Grid>
        <Grid>
          <Button
            className={classes.btn}
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
          >
            save
          </Button>
          <Button
            className={classes.btn}
            disabled={isSubmitting}
            variant="contained"
            color="inherit"
            onClick={goBack}
          >
            Cancel
          </Button>
        </Grid>
        {message ? (
          <Typography color="error" variant="overline" display="inline">
            {message}
          </Typography>
        ) : (
          <Typography></Typography>
        )}
      </form>
    </Grid>
  );
}

export default Collection;
