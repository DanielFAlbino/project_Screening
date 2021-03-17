import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
  },
});

export default function TableData({ cards, setCardsLis }) {
  const classes = useStyles();
  const [card, setCard] = useState([]);

  useEffect(() => {
    /* let data = [];
     cards.map((arr) => {
      data.push(arr);
    }); 
    setCard(data); */
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/*  {titles.map((row) => (
              <TableCell align="center">{row}</TableCell>
            ))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/*  {card.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.cardName}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.cardNumber}
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
