import { React, useState, useCallback, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { update, getUser } from "../../Services/user";
import { useHistory } from "react-router-dom";

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
    width: "50vh",
  },
  tf: {
    width: "100vh !important",
  },

  message: {
    margin: "10px",
  },
}));

function Profile(props) {
  const user = props.match.params.userId;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();
  const goBack = useCallback(() => history.push("/dashboard"), [history]);

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleGetUser = async () => {
    const data = await getUser(user).then((res) => {
      return res;
    });
    const arr = {
      username: data.username,
      name: data.name,
      password: data.password,
    };
    setFormData(arr);
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

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(formData)}
      >
        <Grid className={classes.grid} container lg={12}>
          <TextField
            name="username"
            label="username *"
            type="text"
            variant="outlined"
            className={classes.tf}
            onChange={handleChange("username")}
            value={formData.username}
          />
        </Grid>
        <Grid className={classes.grid} container lg={12}>
          <TextField
            name="name"
            label="name *"
            type="text"
            variant="outlined"
            className={classes.tf}
            onChange={handleChange("name")}
            value={formData.name}
          />
        </Grid>
        <Grid container lg={12}>
          <TextField
            name="password"
            label="password *"
            type="password"
            variant="outlined"
            className={classes.tf}
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
            Save
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

export default Profile;
