import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export const NavBar = (p: { isAdmin: boolean }) => {
  const classes = useStyles();
  const { signOut } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  async function handleSignOut() {
    try {
      await signOut();
      history.push("/signin");
    } catch {}
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <MenuItem component={Link} to={"/"}>
          <Typography variant="h6">Home</Typography>
        </MenuItem>
        <div>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            {p.isAdmin && (
              <MenuItem component={Link} to={"/Admin"}>
                Admin
              </MenuItem>
            )}
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
