import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core/";

/* import { Link } from "react-router-dom"; */
const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
  },
});

export default function TableData({ cards, setCardsLis }) {
  const classes = useStyles();
  const [card, setCard] = useState([]);
  const titles = ["#", "Name", "Description"];

  useEffect(() => {
    let data = [];
    if (cards) {
      cards.map((arr) => {
        data.push(arr);
      });
      setCard(data);
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles.map((row) => (
              <TableCell align="center">{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cards ? (
            card.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.cardName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.cardNumber}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={3}>
                <Typography variant="h6" component="h6" align="center">
                  No data to show
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
