import { NavBar } from "./navbar";
import { api } from "../api";
import { useAuth } from "../contexts/authContext";
import React, { useEffect, useState } from "react";
import { AdminResponse, User } from "../types/types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export const Admin = () => {
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState<AdminResponse>({ users: [] });
  const remote = api(currentUser);
  const [error, setError] = useState<string>();

  useEffect(() => {
    try {
      remote.admin<AdminResponse>().then((v) => setAdmin(v));
    } catch (err) {
      setError("An error has occurred !");
    }
  }, []);

  return (
    <div>
      <NavBar isAdmin={true} />
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
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
