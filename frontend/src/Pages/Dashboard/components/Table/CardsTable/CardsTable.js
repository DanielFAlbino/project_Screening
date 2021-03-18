import { React } from "react";

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
  cell: {
    width: "20%",
  },
});

export default function CardsTable({ data, titles, isAdmin }) {
  const classes = useStyles();

  const onDelete = (id) => {
    console.log(id);
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
            <TableCell align="center">
              <TextField
                className={classes.Input}
                id="standard-basic"
                label="Search by card name or Added by"
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
          {data.map((row) => (
            <TableRow key={row[0]}>
              <TableCell component="th">{row[1]}</TableCell>
              <TableCell component="th">{row[2]}</TableCell>
              <TableCell component="th">
                <Link to={`profile/${row[3]}`}>{row[7]}</Link>
              </TableCell>
              <TableCell align="left">
                <MenuItem>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Link to={`card/${row[0]}`}>
                      <Edit />
                    </Link>
                  </IconButton>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => onDelete(row[0])}
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
