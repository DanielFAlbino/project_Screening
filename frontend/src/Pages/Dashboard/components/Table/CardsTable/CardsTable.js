import { React, useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
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
import { Add, Delete, Edit, Close } from "@material-ui/icons";
import { getAllCards, getCards, remove } from "../../../../../Services/card";
import { getUser } from "../../../../../Services/user";
import Select from "./components/Select/Select";

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

export default function CardsTable({ isAdmin, userId, collections }) {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [addToCollection, setAddToCollection] = useState(false);
  const debounceFilter = useMemo(() => _.debounce(setFilter, 500), [setFilter]);
  const cardHeader = ["#", "Name", "Description", "Added by", "Actions"];

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    debounceFilter(value);
  };

  const onGetCards = async () => {
    if (!isAdmin) {
      cardHeader.splice(3, 2, "Actions");
    }

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
    onGetCards();
  }, [filter, message, cards]);

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
            <TableCell align="left" scope="row" colSpan={cardHeader.length}>
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
            {cardHeader.map((row) => (
              <TableCell align="center">{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!cards.length ? (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={cardHeader.length}>
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
                    {addToCollection ? (
                      <Grid>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={() => setAddToCollection(false)}
                          color="inherit"
                        >
                          <Close />
                        </IconButton>
                        <Select collectionList={collections} card={row}  addedToCollection={setAddToCollection}/>
                      </Grid>
                    ) : (
                      <Grid>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={() => setAddToCollection(true)}
                          color="inherit"
                        >
                          <Add />
                        </IconButton>
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
                          onClick={onDelete(row._id, row.name)}
                          color="inherit"
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    )}
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
