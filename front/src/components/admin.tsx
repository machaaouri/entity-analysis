import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { NavBar } from "./navbar";
import { api } from "../api";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { AdminResponse, User } from "../types/types";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f8f9fa",
    height: "100vh",
    "& > .alert": {
      margin: 0,
      padding: "",
    },
  },
  container: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
  },
});

export const Admin = () => {
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState<AdminResponse>({ users: [] });
  const remote = api(currentUser);
  const [error, setError] = useState<string>();
  const classes = useStyles();

  function createData(user: User) {
    return { uid: user.uid };
  }

  useEffect(() => {
    remote
      .admin<AdminResponse>()
      .then((v) => {
        setAdmin(v);
      })
      .catch((err) => setError("An error has occurred !"));
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className={classes.container}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>uid</TableCell>
                <TableCell>email</TableCell>
                <TableCell align="right">count&nbsp;(g)</TableCell>
                <TableCell>text</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admin.users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell component="th" scope="row">
                    {user.uid}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">{user.count}</TableCell>
                  <TableCell>{user.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
