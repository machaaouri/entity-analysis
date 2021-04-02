import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../contexts/authContext";

export const NavBar = () => {
  const { signOut, currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const remote = api(currentUser);

  useEffect(() => {
    remote.isAdmin<{ isAdmin: boolean }>().then((v) => setIsAdmin(v.isAdmin));
  }, [currentUser?.email]);

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
          {isAdmin && <Link to="/Admin">Admin</Link>}
          <Button variant="link" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
