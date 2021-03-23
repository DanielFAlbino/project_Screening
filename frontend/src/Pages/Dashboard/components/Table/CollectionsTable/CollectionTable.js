import { React, useMemo, useState, useEffect } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  getAllCollection,
  getCollectionByUser,
  remove,
} from "../../../../../Services/collection";
import { getUser } from "../../../../../Services/user";

const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
  },
  Input: {
    paddingTop: "0px",
    marginTop: "-20px",
    width: "45vh",
  },
  cell: {
    width: "20%",
  },
  linkColor: {
    color: "black",
  },
});

export default function CollectionTable({ isAdmin, userId, getCollections }) {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);
  const collectionHeader = isAdmin
    ? ["Collection", "User", "Actions"]
    : ["Collection", "Actions"];
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
      data = await getCollectionByUser(userId).then((res) => {
        return res.collections;
      });
    }

    // Get user by userId to show in collections table (if the user is admin)
    await Promise.all(
      data.map(async (row, index) => {
        const user = await getUser(row.userId);
        row.username = user.username;
      })
    );

    if (filter) {
      const collectionFilter = [];
      data.filter((val) => {
        if (
          val.collectionName.includes(filter) ||
          (val.username && val.username.includes(filter))
        )
          collectionFilter.push(val);
      });
      data = collectionFilter;
    }
    setCollections(data);
    getCollections(data);
  };

  const onDelete = (id, name) => async (e) => {
    e.preventDefault();
    const res = window.confirm(`You are about to remove '${name}', continue?`);
    if (res) {
      const message = await remove(id).then((res) => {
        return res.message;
      });
      setMessage(message);
      return;
    }
  };

  useEffect(() => {
    onGetCollection();
  }, [filter, message]);

  return (
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
                label="Search by collection or user"
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
            collections.map((row, index) => (
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
    </TableContainer>
  );
}
