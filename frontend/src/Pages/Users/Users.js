import { React, useMemo, useState, useEffect } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getUsers } from "../../Services/user";
import { getUserId } from "../../Utils/localStorage";
import Navbar from "../../Components/NavBar/NavBar";

const useStyles = makeStyles({
  table: {
    marginTop: "10px",
    minWidth: 650,
  },
  Input: {
    paddingTop: "0px",
    marginTop: "-20px",
    width: "45vh",
  },
});

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const tableHeader = ["Name", "Usermame", "Actions"];
  const userId = getUserId();
  const [filter, setFilter] = useState("");
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    debounceFilter(value);
  };

  const onGetUsers = async () => {
    const users = await getUsers().then((res) => {
      return res;
    });
    setUsers(users);

    if (filter) {
      const usersFilter = [];
      users.filter((val) => {
        if (val.username.includes(filter) || val.name.includes(filter))
          usersFilter.push(val);
      });
      setUsers(usersFilter);
    }

    return users;
  };

  const onDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    onGetUsers();
  }, [filter]);

  return (
    <Grid>
      <Navbar />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TextField
                  className={classes.Input}
                  id="standard-basic"
                  label="Search by collection or user"
                  onChange={handleChange}
                  value={filter}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              {tableHeader.map((title) => (
                <TableCell align="center">{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">
                  <MenuItem align="center">
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <Link to={`profile/${row._id}`}>
                        <Edit />
                      </Link>
                    </IconButton>
                    {row._id === JSON.parse(userId)._id ? (
                      <></>
                    ) : (
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => onDelete(row._id)}
                        color="inherit"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </MenuItem>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
