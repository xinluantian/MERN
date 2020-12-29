import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { Link } from "react-router-dom";

import SearchUser from "./SearchUser";
import CreateNewUser from "./CreateNewUser";

function createData(first, last, sex, age) {
  return { first, last, sex, age };
}

const rows = [createData("LUNA", "TIAN", "female", 24)].sort((a, b) =>
  a.age < b.age ? -1 : 1
);

const useStyles = makeStyles((theme) => ({
  table: {
    width: "80%",
    height: "80%",
    margin: "0 auto",
  },
}));

export default function Form() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <SearchUser />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.first}>
                <TableCell style={{ width: 160 }} align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Button
                    variant="contained"
                    color="disabled"
                    className={classes.button}
                    startIcon={<HighlightOffIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.first}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.last}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.sex}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.age}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Button
                variant="contained"
                color="disabled"
                className={classes.button}
              >
                Prev
              </Button>
              <Button
                variant="contained"
                color="disabled"
                className={classes.button}
              >
                Next
              </Button>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Link to="/api/users/add/">
        <Button
          variant="contained"
          color="green"
          className={classes.button}
          startIcon={<PersonAddOutlinedIcon />}
        >
          Create new user
        </Button>
      </Link>
    </div>
  );
}
