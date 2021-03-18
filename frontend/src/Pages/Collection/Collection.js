import { React, useEffect, useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { getCollection } from "../../Services/collection";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Table from "./components/Table/Table";
import Navbar from "../../Components/NavBar/NavBar";
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
    marginTop: "2vh",
  },
  grid: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  btn: {
    margin: "10px",
    marginTop: "40px",
    width: "40vh",
    height: "40px",
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const goBack = useCallback(() => history.push("/dashboard"), [history]);

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
    <Grid
      classNmae={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Navbar />
      <Grid
        lg={12}
        className={classes.grid}
        container
        justify="center"
        alignItems="center"
      >
        <TextField
          name="collectionName"
          type="text"
          label="Collection name"
          onChange={handleChange("collectionName")}
          value={formData.collectionName}
        />
      </Grid>
      <Grid>
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
    </Grid>
  );
}

export default Collection;
