import { React, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import {
  ExitToApp,
  AccountCircle,
  People,
  Dashboard,
} from "@material-ui/icons";
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
  linkColor: {
    color: "white",
  },
}));

function NavBar() {
  var user = getUserId();
  const classes = useStyles();

  const handleLogout = () => {
    removeUser();
    removeToken();
    window.location.assign("/login");
  };

  useEffect(() => {
    user = getUserId();
  }, [getUserId]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          MTG Collection
        </Typography>

        {user ? (
          <MenuItem>
            {JSON.parse(user).isAdmin ? (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link className={classes.linkColor} to={`/users`}>
                  <Tooltip title="Users list" aria-label="users list">
                    <People />
                  </Tooltip>
                </Link>
              </IconButton>
            ) : (
              <></>
            )}

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link className={classes.linkColor} to={`/`}>
                <Tooltip title="Dashboard" aria-label="dashboard">
                  <Dashboard />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link
                className={classes.linkColor}
                to={{
                  pathname: `/profile/${JSON.parse(user)._id}`,
                  state: { editing: false },
                }}
              >
                <Tooltip title="Profile" aria-label="profile">
                  <AccountCircle />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <Tooltip title="Logout" aria-label="logout">
                <ExitToApp />
              </Tooltip>
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
