import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Grid,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  IconButton,
  TableRow,
} from "@material-ui/core/";
import { Delete, Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import { getCollection, update } from "../../../../Services/collection";
import { getCard } from "../../../../Services/card";

const useStyles = makeStyles({
  table: {
    minWidth: "100vh",
    maxWidth: "122vh",
  },
  Flag: {
    position: "absolute",
    top: "80px",
    right: "20px",
    width: "300px",
    zIndex: "2",
  },
});

export default function TableData({ collectionId }) {
  const classes = useStyles();
  const [collName, setCollName] = useState("");
  const [card, setCard] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(true);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [open, setOpen] = useState(false);

  const titles = ["#", "Name", "Description", "Actions"];

  const handleCards = async () => {
    let cardsList = [];
    const data = await getCollection(collectionId).then((res) => {
      return res.collections;
    });
    setCollName(data.collectionName);
    if (data.cardsList && data.cardsList.length > 0) {
      await Promise.all(
        data.cardsList.map(async (card) => {
          const res = await getCard(card._id);
          cardsList.push(res.card);
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

  const onDelete = async (index, name) => {
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
        collectionName: collName,
        cardsList: data.map((card) => {
          return { _id: card._id };
        }),
      };
      await update(collectionId, collection)
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
      handleCards();
    }
  };

  useEffect(() => {
    handleCards();
  }, []);

  return (
    <Grid>
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
                  <TableCell component="th" scope="row" align="center">
                    {row.cardNumber}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
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
