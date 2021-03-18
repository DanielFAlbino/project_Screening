import { React, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { ExitToApp, AccountCircle } from "@material-ui/icons";
import { removeUser, removeToken } from "../../Utils/localStorage";
import { getUserId } from "../../Utils/localStorage";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const user = getUserId();
  const classes = useStyles();
  const handleLogout = () => {
    removeUser();
    removeToken();
    window.location.assign("/login");
  };

  useEffect(() => {}, [user]);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          MTG Collection
        </Typography>

        {user ? (
          <MenuItem>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link to={`/profile/${JSON.parse(user)._id}`}>
                {" "}
                <AccountCircle />
              </Link>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
          </MenuItem>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
