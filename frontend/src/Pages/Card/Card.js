import { React, useState, useCallback, useEffect } from "react";

//components
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  TextareaAutosize,
  Button,
  Typography,
} from "@material-ui/core";
import Navbar from "../../Components/NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { getCard, update, register } from "../../Services/card";
import { getUserId } from "../../Utils/localStorage";
import AlertMessage from "../../Components/Alerts/Alerts";
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
}));

function Card(props) {
  const card = props.match.params.cardId;
  const classes = useStyles();
  var Message;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: 0,
    name: "",
    description: "",
  });
  const history = useHistory();
  const goBack = useCallback(() => history.push("/dashboard"), [history]);

  const handleChange = (name) => (event) => {
    setMessage("");
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handelGetCard = async () => {
    const data = await getCard(card).then((res) => res);
    setFormData({
      _id: data.card._id,
      cardNumber: data.card.cardNumber,
      name: data.card.name,
      description: data.card.description,
    });
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const user = JSON.parse(getUserId());
    let message;
    formData.userId = user._id;

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.cardNumber == 0
    ) {
      setIsSubmitting(false);
      return setMessage("All fields are required");
    }
    if (card) {
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

  useEffect(() => {
    if (card) handelGetCard();
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

export default Card;
