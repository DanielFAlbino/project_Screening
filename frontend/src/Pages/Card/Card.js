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
    marginTop: "40px",
    width: "40vh",
    height: "40px",
  },
  Area: {
    margin: "10px",
    width: "90vh",
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
      setFormData({
        _id: data.card._id,
        cardNumber: data.card.cardNumber,
        name: data.card.name,
        description: data.card.description,
      });
    }
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const user = JSON.parse(getUserId());
    formData.userId = user._id;

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.cardNumber === 0
    ) {
      setIsSubmitting(false);
      return setMessage("All fields are required");
    }
    if (card) {
      await update(formData._id, formData)
        .then((res) => {
          setMessage(res.message);
          setMessageColor("success");
        })
        .catch((err) => {
          setMessage(err.message);
          setMessageColor("error");
        });
    } else {
      await register(formData)
        .then((res) => {
          setMessage(res.message);
          setMessageColor("success");
        })
        .catch((err) => {
          setMessage(err.message);
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
        <Grid>
          <TextField
            name="cardNumber"
            label="card number"
            type="number"
            onChange={handleChange("cardNumber")}
            value={formData.cardNumber}
          />
          <TextField
            name="name"
            label="name"
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
          />
        </Grid>
        <Grid>
          <TextareaAutosize
            aria-label="empty textarea"
            className={classes.Area}
            rows={5}
            rowsMax={10}
            defaultValue={formData.description}
            onChange={handleChange("description")}
          />
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

export default Card;
