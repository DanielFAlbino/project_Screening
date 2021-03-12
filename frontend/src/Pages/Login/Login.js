import { React, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../Services/auth";

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

function Login({ setToken }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({ username: "", password: "" });
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
    await login(formData).then((res) => {
      if (res) {
        setToken(res.token);
        return res;
      } else {
        console.log("not logged in!");
      }
      setIsSubmitting(false);
    });
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
            name="username"
            label="username"
            type="username"
            onChange={handleChange("username")}
            value={formData.username}
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

export default Login;
