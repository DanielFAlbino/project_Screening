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
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
});

const onDelete = (id) => {
  console.log(id);
};

export default function CollectionTable({ data, titles, isAdmin }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={11}>
            {!isAdmin ? (
              <TableCell align="left" className={classes.cell}>
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
              <TableCell align="left" className={classes.cell}></TableCell>
            )}
            <TableCell align="left">
              <TextField
                className={classes.Input}
                id="standard-basic"
                label="Search by collection or user"
              />
            </TableCell>
          </TableRow>
          <TableRow key={10}>
            {titles.map((row) => (
              <TableCell align="left">{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row[0]}>
              <TableCell align="left">{row[1]}</TableCell>
              <TableCell align="left">
                <Link to={`profile/${row[0]}`}>{row[7]}</Link>
              </TableCell>
              <TableCell align="left">
                <MenuItem>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Link to={`collection/${row[0]}`}>
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
