import { React, useState, useCallback, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { login } from "../../Services/auth";
import { setUser, setToken } from "../../Utils/localStorage";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavBar/NavBar";
import { useHistory } from "react-router-dom";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "20vh",
    },
  },
  grid: {
    height: "60px",
    marginBottom: "5px",
  },
  btn: {
    marginLeft: "7px",
    marginTop: "20px",
    marginBottom: "30px",
    height: "40px",
    width: "100vh",
  },
  tf: {
    width: "100vh !important",
  },

  message: {
    margin: "10px",
  },
}));

function Login() {
  const classes = useStyles();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const goTo = useCallback(() => history.push("/dashboard"), [history]);

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value.replace(/  +/g, " "),
    });
  };

  useEffect(() => {
    setMessage("");
  }, [formData]);

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.username.trim() || !formData.password.trim()) {
      setIsSubmitting(false);
      setMessage("All fields are required");
      return;
    } else {
      try {
        await login(formData).then((res) => {
          setUser(res.user);
          setToken(res.token);
          goTo();
        });
      } catch (err) {
        setMessage(err.response.data.message);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Navbar />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(formData)}
      >
        <Grid className={classes.grid} container lg={12}>
          <TextField
            name="username"
            label="username"
            type="text"
            variant="outlined"
            className={classes.tf}
            onChange={handleChange("username")}
            value={formData.username}
          />
        </Grid>
        <Grid container lg={12}>
          <TextField
            name="password"
            label="password"
            type="password"
            variant="outlined"
            className={classes.tf}
            value={formData.password}
            onChange={handleChange("password")}
          />
        </Grid>
        <Grid container lg={12}>
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
        <Grid>
          <Link to="/register">New user!</Link>
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

export default Login;
