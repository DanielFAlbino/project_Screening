import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  IconButton,
  TableRow,
  MenuItem,
} from "@material-ui/core/";
import { Delete } from "@material-ui/icons";
const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
  },
});

export default function TableData({ cards, setCardsLis }) {
  const classes = useStyles();
  const [card, setCard] = useState([]);
  const titles = ["#", "Name", "Description", "Actions"];

  const onDelete = (id, name) => async (e) => {
    console.log("here");
  };

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
    <Grid>
      <TableContainer>
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
                    {row.cardNumber}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <MenuItem>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={onDelete(row._id, row.collectionName)}
                        color="inherit"
                      >
                        <Delete />
                      </IconButton>
                    </MenuItem>
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
    </Grid>
  );
}
