import { React, useMemo, useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUsers, remove } from "../../Services/user";
import { getUserId } from "../../Utils/localStorage";
import Navbar from "../../Components/NavBar/NavBar";

const useStyles = makeStyles({
  container: {
    Width: "80vh",
    marginTop: "20px",
    marginLeft: "40px",
    marginRight: "40px",
  },
  table: {
    marginTop: "10px",
    minWidth: "100vh",
  },
  Input: {
    paddingTop: "0px",
    marginTop: "5px",
    width: "45vh",
  },
});

export default function UsersTable() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const tableHeader = ["Name", "Usermame", "Actions"];
  const userId = getUserId();
  const [filter, setFilter] = useState("");
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);
  const goBack = useCallback(() => history.push("/"), [history]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    debounceFilter(value);
  };

  const onGetUsers = async () => {
    const admin = JSON.parse(userId).isAdmin;
    if (!admin) {
      goBack();
    }
    const users = await getUsers().then((res) => {
      return res.users;
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

  const onDelete = async (id, username) => {
    const res = window.confirm(
      `You are about to remove user '${username}', continue?`
    );
    if (res) {
      const message = await remove(id).then((res) => {
        return res.message;
      });
      onGetUsers();
      return;
    }
  };

  useEffect(() => {
    onGetUsers();
  }, [filter]);

  return (
    <Grid container>
      <Navbar />
      <TableContainer component={Paper} className={classes.container}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <TextField
                  className={classes.Input}
                  id="standard-basic"
                  label="Search by user or username"
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
            {!users.length ? (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={tableHeader.length}
                >
                  <Typography variant="h6" component="h6" align="center">
                    No data to show
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <Link
                          to={{
                            pathname: `profile/${row._id}`,
                            state: { editing: true },
                          }}
                        >
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
                          onClick={() => onDelete(row._id, row.username)}
                          color="inherit"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Grid>
  );
}
