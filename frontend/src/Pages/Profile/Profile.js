import { React, useState, useCallback, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Checkbox,
  TextField,
  Button,
  FormControlLabel,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import { getUserId } from "../../Utils/localStorage";
import { update, getUser } from "../../Services/user";
import Navbar from "../../Components/NavBar/NavBar";

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
  Flag: {
    position: "absolute",
    top: "80px",
    right: "20px",
    width: "300px",
    zIndex: "2",
  },
}));

function Profile(props) {
  const isAdmin = JSON.parse(getUserId()).isAdmin;
  const userId = JSON.parse(getUserId())._id;
  const user = props.match.params.userId;
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [messageColor, setMessageColor] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    isAdmin: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();
  const goBack = useCallback(() => history.goBack(), [history]);

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: name === "isAdmin" ? event.target.checked : event.target.value,
    });
  };

  const handleGetUser = async () => {
    setIsSubmitting(true);
    if (!isAdmin && userId !== user) {
      goBack();
      return;
    }

    const data = await getUser(user).then((res) => {
      return res;
    });

    const arr = {
      username: data.username,
      name: data.name,
      isAdmin: data.isAdmin,
    };

    arr.isAdmin ? setChecked(true) : setChecked(false);
    setIsSubmitting(false);
    setFormData(arr);
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    await update(userId, formData)
      .then((res) => {
        setOpen(true);
        setIsSubmitting(false);
        setMessage(res.message);
        setMessageColor("success");
      })
      .catch((err) => {
        setOpen(true);
        setMessage(err.message);
        setMessageColor("error");
      });
    setIsSubmitting(false);
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
        <Grid className={classes.grid} container lg={12}>
          <TextField
            name="username"
            label="username *"
            type="text"
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            variant="outlined"
            className={classes.tf}
            onChange={handleChange("name")}
            value={formData.name}
          />
        </Grid>
        <Grid container lg={12}>
          <TextField
            name="password"
            label="New password "
            type="password"
            variant="outlined"
            disabled={isSubmitting}
            className={classes.tf}
            value={formData.password}
            onChange={handleChange("password")}
          />
        </Grid>
        <Grid>
          {isAdmin ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange("isAdmin")}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Admin"
            />
          ) : (
            <></>
          )}
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
