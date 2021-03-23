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
  Card,
} from "@material-ui/core/";
import { Delete } from "@material-ui/icons";

import { getCollection, update } from "../../../../Services/collection";
import { getCard } from "../../../../Services/card";

const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
  },
});

export default function TableData({ collectionId }) {
  const classes = useStyles();
  const [card, setCard] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(true);

  const titles = ["#", "Name", "Description", "Actions"];

  const handleCards = async () => {
    let cardsList = [];
    const data = await getCollection(collectionId).then((res) => {
      return res.collections.cardsList;
    });
    if (data && data.length > 0) {
      await Promise.all(
        data.map(async (card) => {
          let cardId = card._id;
          await getCard(cardId).then((res) => {
            cardsList.push(res.card);
          });
        })
      );
      setIsSubmitting(false);
      setCard(cardsList);
      return;
    } else {
      setCard(null);
      setIsSubmitting(false);
    }
  };

  const onDelete = async (index, id, name) => {
    const res = window.confirm(
      "You are about to remove the Card " +
        name +
        " from your collection, continue?"
    );
    if (res) {
      const data = card;
      data.splice(index, 1);
      setCard(data);
      const collection = {
        cardsList: data,
      };

      const message = await update(id, collection).then((res) => {
        return res.message;
      });
      alert(message);
    }
  };

  useEffect(() => {
    handleCards();
  }, [card]);

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
            {card ? (
              card.map((row, index) => (
                <TableRow key={index}>
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
                        onClick={() =>
                          onDelete(index, row._id, row.collectionName)
                        }
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
                <TableCell component="th" scope="row" colSpan={4}>
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
