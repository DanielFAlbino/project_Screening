import { React, useEffect, useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { register, getCollection, update } from "../../Services/collection";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

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
  Flag: {
    position: "absolute",
    top: "80px",
    right: "20px",
    width: "300px",
    zIndex: "2",
  },
}));

function Collection(props) {
  const classes = useStyles();
  const collection = props.match.params.collectionId;
  const isAdmin = JSON.parse(getUserId()).isAdmin;
  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionId] = useState("");
  const [formData, setFormData] = useState({
    collectionName: "",
  });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const goBack = useCallback(() => history.push("/"), [history]);
  let isEdit = false;
  if (props.location.state) {
    isEdit = props.location.state.editing;
  }

  const handleGetCollection = async () => {
    setIsSubmitting(true);
    setOpen(false);
    if (collection) {
      const data = await getCollection(collection).then((res) => {
        return res.collections;
      });
      const arr = {
        collectionName: data.collectionName,
      };
      setCollectionId(data._id);
      setCollections(data.collections);

      setFormData(arr);
    }
    setIsSubmitting(false);
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.collectionName.trim()) {
      setIsSubmitting(false);
      setMessage("All fields are required");
      setMessageColor("error");
      setOpen(true);
    }

    if (collection) {
      await update(collectionId, formData)
        .then((res) => {
          setMessage(res.message);
          setMessageColor("success");
          setOpen(true);
          window.setInterval(goBack(), 1000);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setMessageColor("error");
        });
      setOpen(true);
      setIsSubmitting(false);
      return;
    }
    await register(formData)
      .then((res) => {
        setFormData({
          ...formData,
          collectionName: "",
        });
        setMessage(res.message);
        setMessageColor("success");
        setOpen(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setMessageColor("error");
        setOpen(true);
      });

    setIsSubmitting(false);
  };

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    if (isAdmin && !isEdit) {
      goBack();
    }
    handleGetCollection();
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Navbar />
      {message ? (
        <Collapse in={open} className={classes.Flag}>
          <Alert
            severity={messageColor}
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
      ) : (
        <></>
      )}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(formData)}
      >
        <Grid item className={classes.txtField}>
          <TextField
            name="collectionName"
            label="collection name"
            type="text"
            onChange={handleChange("collectionName")}
            value={formData.collectionName}
          />
        </Grid>
        <Grid container lg={10}>
          <Table collectionId={collection} />
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
            Close
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default Collection;
