import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { update } from "../../Services/user";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "40vh",
    },
  },
  btn: {
    marginTop: "40px",
    width: "62vh",
    height: "40px",
  },
}));

function CreateUser() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await update(formData).then((res) => {
      setIsSubmitting(false);
      if (res) {
        return res.startus(200).send("User updated!");
      } else {
        return res.startus(400).send("Impossible to update user!");
      }
    });
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(formData)}>
        <Grid>
          <TextField
            name="username"
            label="username"
            type="text"
            onChange={handleChange("username")}
            value={formData.username}
          />
          <TextField
            name="name"
            label="name"
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
          />
          <TextField
            name="password"
            label="password"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
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
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default CreateUser;
