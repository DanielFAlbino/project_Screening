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
  MenuItem,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  getAllCollection,
  getCollectionByUser,
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

const onDelete = (id) => {
  console.log(id);
};

export default function CollectionTable({ titles, isAdmin, userId }) {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);
  const [filter, setFilter] = useState("");
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    debounceFilter(value);
  };

  const onGetCollection = async () => {
    if (!isAdmin) titles.splice(1, 2, "Actions");
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

    data.map(async (row) => {
      const user = await getUser(row.userId).then((res) => {
        return res.username;
      });
      row.user = user;
    });
    if (filter) {
      const collectionFilter = [];
      data.filter((val) => {
        if (
          val.collectionName.includes(filter) ||
          (val.user && val.user.includes(filter))
        )
          collectionFilter.push(val);
      });
      data = collectionFilter;
    }

    setCollections(data);
  };

  useEffect(() => {
    onGetCollection();
  }, [filter]);

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
            <TableCell aalign="center" scope="row" colSpan={titles.length}>
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
            {titles.map((row) => (
              <TableCell
                align="center"
                colSpan={!isAdmin ? titles.length + 1 : 1}
              >
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {collections.map((row) => (
            <TableRow key={row._id}>
              <TableCell
                align="center"
                colSpan={!isAdmin ? titles.length + 1 : 1}
              >
                {row.collectionName}
              </TableCell>
              {isAdmin ? (
                <TableCell component="th" align="center">
                  <Link
                    className={classes.linkColor}
                    to={`profile/${row.userId}`}
                  >
                    {row.user}
                  </Link>
                </TableCell>
              ) : (
                <></>
              )}
              <TableCell align="center">
                <MenuItem>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Link
                      className={classes.linkColor}
                      to={`collection/${row._id}`}
                    >
                      <Edit />
                    </Link>
                  </IconButton>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => onDelete(row._id)}
                    color="inherit"
                  >
                    <Delete />
                  </IconButton>
                </MenuItem>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
