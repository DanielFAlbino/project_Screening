import { React, useMemo, useState, useEffect } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

import {
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Add, Delete, Edit, Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import {
  getAllCollection,
  getCollectionByUser,
  remove,
} from "../../../../../Services/collection";
import { getUser } from "../../../../../Services/user";

const useStyles = makeStyles({
  table: {
    maxWidth: "100vh",
  },
  Input: {
    paddingTop: "0px",
    marginTop: "-15px",
    width: "45vh",
  },
  cell: {
    width: "20%",
  },
  linkColor: {
    color: "black",
  },
  Flag: {
    position: "absolute",
    top: "80px",
    right: "20px",
    width: "300px",
    zIndex: "2",
  },
});

export default function CollectionTable({ isAdmin, userId, getCollections }) {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [open, setOpen] = useState(false);

  const [filter, setFilter] = useState("");
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);
  const collectionHeader = isAdmin
    ? ["Collection", "User", "Actions"]
    : ["Collection", "Actions"];

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

  const onGetCollection = async () => {
    let data;
    if (isAdmin) {
      data = await getAllCollection().then((res) => {
        return res.collections;
      });
    } else {
      data = await getCollectionByUser(userId)
        .then((res) => {
          return res.collections;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            return [];
          }
        });
    }
    if (data) {
      // Get user by userId to show in collections table (if the user is admin)
      await Promise.all(
        data.map(async (row, index) => {
          const data = await getUser(row.userId);
          row.username = data.user.username;
        })
      );

      if (filter) {
        const collectionFilter = [];
        data.filter((val) => {
          if (
            val.collectionName.includes(filter) ||
            (val.username && val.username.includes(filter) && isAdmin)
          )
            collectionFilter.push(val);
        });
        data = collectionFilter;
      }
    }

    setCollections(data);
    getCollections(data);
  };

  const onDelete = (id, name) => async (e) => {
    e.preventDefault();
    const res = window.confirm(`You are about to remove '${name}', continue?`);
    if (res) {
      await remove(id)
        .then((res) => {
          setMessage(res.message);
          setMessageColor("success");
          setOpen(true);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setMessageColor("error");
          setOpen(true);
        });
      onGetCollection();
      return;
    }
  };

  useEffect(() => {
    onGetCollection();
  }, [filter, message]);

  return (
    <>
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow key={11}>
              {!isAdmin ? (
                <TableCell align="center" className={classes.cell}>
                  <Link to={"/collection"}>
                    <Tooltip
                      title="Create collection"
                      aria-label="Create collection"
                    >
                      <Add />
                    </Tooltip>
                  </Link>
                </TableCell>
              ) : (
                <TableCell align="center" className={classes.cell}></TableCell>
              )}
              <TableCell
                aalign="center"
                scope="row"
                colSpan={collectionHeader.length}
              >
                <TextField
                  className={classes.Input}
                  id="standard-basic"
                  label={
                    isAdmin
                      ? "Search by collection or user"
                      : "Search by collection"
                  }
                  onChange={handleChange}
                  value={filter}
                />
              </TableCell>
            </TableRow>
            <TableRow key={10}>
              {collectionHeader.map((row) => (
                <TableCell align="center">{row}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!collections.length ? (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={collectionHeader.length}
                >
                  <Typography variant="h6" component="h6" align="center">
                    No data to show
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              collections
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" align="center">
                      {row.collectionName}
                    </TableCell>
                    {isAdmin ? (
                      <TableCell component="th" align="center">
                        <Link
                          className={classes.linkColor}
                          to={`profile/${row.userId}`}
                        >
                          {row.username}
                        </Link>
                      </TableCell>
                    ) : (
                      <></>
                    )}
                    <TableCell component="th" align="center">
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <Link
                          className={classes.linkColor}
                          to={{
                            pathname: `collection/${row._id}`,
                            state: { editing: true },
                          }}
                        >
                          <Edit />
                        </Link>
                      </IconButton>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={onDelete(row._id, row.collectionName)}
                        color="inherit"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={collections.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
