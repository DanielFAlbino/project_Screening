import { React, useState, useCallback, useEffect } from "react";

//components
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  TextareaAutosize,
  Button,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import Navbar from "../../Components/NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { getCard, update, register } from "../../Services/card";
import { getUserId } from "../../Utils/localStorage";
//style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "30vh",
    },
  },
  btn: {
    margin: "10px",
    marginTop: "80px",
    width: "40vh",
    height: "40px",
  },
  Area: {
    top: "100px",
    margin: "10px",
    height: "50px",
  },
  txtfield: {
    top: "-28vh",
    width: "80vh !important",
  },
  txt: {
    width: "40vh !important",
  },
  Flag: {
    position: "absolute",
    top: "80px",
    right: "20px",
    width: "300px",
    zIndex: "2",
  },
}));

function Card(props) {
  const card = props.match.params.cardId;
  const classes = useStyles();
  const isAdmin = JSON.parse(getUserId()).isAdmin;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [open, setOpen] = useState(false);
  const [cardId, setCardId] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: 0,
    name: "",
    description: "",
  });
  let isEdit = false;
  if (props.location.state) {
    isEdit = props.location.state.editing;
  }
  const history = useHistory();
  const goBack = useCallback(() => history.push("/"), [history]);

  const handleChange = (name) => (event) => {
    setMessage("");
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handelGetCard = async () => {
    if (card) {
      const data = await getCard(card).then((res) => res);
      setCardId(data.card._id);
      setFormData({
        cardNumber: data.card.cardNumber,
        name: data.card.name,
        description: data.card.description,
      });
    }
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (card) {
      await update(cardId, formData)
        .then((res) => {
          setMessage(res.message);
          setMessageColor("success");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setMessageColor("error");
        });
    } else {
      await register(formData)
        .then((res) => {
          setFormData({
            ...formData,
            cardNumber: "",
            name: "",
            description: "",
          });
          setMessage(res.message);
          setMessageColor("success");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setMessageColor("error");
        });
    }
    setOpen(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isAdmin && !isEdit) {
      goBack();
    }
    handelGetCard();
  }, [card]);

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
        <Grid item lg={12}>
          <TextField
            className={classes.txt}
            name="cardNumber"
            label="card number"
            type="number"
            onChange={handleChange("cardNumber")}
            value={formData.cardNumber}
          />
          <TextField
            className={classes.txt}
            name="name"
            label="name"
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
          />
        </Grid>
        <Grid item lg={12} className={classes.Area}>
          <TextField
            className={classes.txtfield}
            label="description"
            value={formData.description}
            onChange={handleChange("description")}
          />
        </Grid>
        <Grid item lg={12}>
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

export default Card;
