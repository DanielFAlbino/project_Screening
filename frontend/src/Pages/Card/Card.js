import { React, useState, useCallback } from "react";

//components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

//style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "40vh",
    },
  },
  btn: {
    margin: "10px",
    marginTop: "40px",
    width: "40vh",
    height: "40px",
  },
}));

function Card() {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: 0,
    name: "",
    description: "",
  });
  const history = useHistory();
  const goBack = useCallback(() => history.push("/dashboard"), [history]);

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };
  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  return (
    <Grid container direction="row" justify="center" alignItems="center">
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
          <TextField
            name="description"
            label="description"
            type="text"
            fullWidth
            value={formData.description}
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
            Cancel
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default Card;
