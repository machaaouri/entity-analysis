import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../contexts/authContext";

export const NavBar = (p: { isAdmin: boolean }) => {
  const { signOut } = useAuth();
  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOut();
      history.push("/login");
    } catch {}
  }

  return (
    <nav
      className="navbar navbar-light bg-light shadow-sm rounded"
      style={{ width: "100%" }}
    >
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/">Native cloud app</Link>
        </div>
        <div className="d-flex align-items-center">
          {p.isAdmin && <Link to="/Admin">Admin</Link>}
          <Button variant="link" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
