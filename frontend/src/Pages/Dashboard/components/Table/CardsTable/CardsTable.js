import { React, useState, useMemo, useEffect } from "react";
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
  MenuItem,
} from "@material-ui/core";
import { getAllCards, getCards } from "../../../../../Services/card";
import { getUser } from "../../../../../Services/user";
import { Add, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
    marginTop: "0px",
    parrdingTop: "0px",
  },
  Input: {
    width: "80vh",
    marginTop: "-3vh",
  },
  Small: {
    width: "50vh",
    marginTop: "-3vh",
  },
  cell: {
    width: "20%",
  },
  linkColor: {
    color: "black",
  },
});

export default function CardsTable({ titles, isAdmin, userId }) {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("");
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    debounceFilter(value);
  };

  const onGetCards = async () => {
    if (!isAdmin) titles.splice(3, 2, "Actions");
    let data;
    if (isAdmin) {
      data = await getAllCards().then((res) => {
        return res.cards;
      });
    } else {
      data = await getCards(userId).then((res) => {
        return res.cards;
      });
    }

    data.map(async (row) => {
      const user = await getUser(row.userId).then((res) => {
        return res.username;
      });
      row.user = user;
    });

    if (filter) {
      const cardsFilter = [];
      data.filter((val) => {
        if (val.name.includes(filter) || val.userId.includes(filter))
          cardsFilter.push(val);
      });
      data = cardsFilter;
    }
    setCards(data);
  };

  useEffect(() => {
    onGetCards();
  }, [filter]);

  const onDelete = (id, name) => {
    const res = window.confirm(`You are about to remove '${name}', continue?`);
    if (res) {
      console.log("deleted!" + id);
      setCards([]);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={10}>
            {!isAdmin ? (
              <TableCell align="left" className={classes.cell}>
                <Link to={"/card"}>
                  <Tooltip title="Add card" aria-label="add card">
                    <Add />
                  </Tooltip>
                </Link>
              </TableCell>
            ) : (
              <TableCell align="left" className={classes.cell}></TableCell>
            )}
            <TableCell align="left" scope="row" colSpan={titles.length}>
              <TextField
                className={classes.Small}
                colSpan={!isAdmin ? 1 : 3}
                id="standard-basic"
                label={
                  !isAdmin
                    ? "Search by card name "
                    : "Search by card name or Added by"
                }
                onChange={handleChange}
                value={filter}
              />
            </TableCell>
          </TableRow>
          <TableRow key={11}>
            {titles.map((row) => (
              <TableCell align="center">{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!cards.length ? (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={titles.length}>
                <Typography variant="h6" component="h6" align="center">
                  No data to show
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            cards.map((row) => (
              <TableRow key={row._id}>
                {" "}
                <TableCell component="th" align="center">
                  {row.cardNumber}
                </TableCell>
                <TableCell component="th" align="center">
                  {row.name}
                </TableCell>
                <TableCell component="th" align="center">
                  {row.description}
                </TableCell>
                {isAdmin ? (
                  <TableCell component="th">
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
                        to={`card/${row._id}`}
                      >
                        <Edit />
                      </Link>
                    </IconButton>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => onDelete(row._id, row.name)}
                      color="inherit"
                    >
                      <Delete />
                    </IconButton>
                  </MenuItem>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
