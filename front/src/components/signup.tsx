import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(3),
  },
  googleSignIn: {
    backgroundColor: "#fff",
    textTransform: "none",
    "& img": { marginRight: theme.spacing(1) },
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    textTransform: "none",
  },
  signin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email && password && passwordConfirm) {
      if (password !== passwordConfirm)
        return setError("Passwords do not match");
      try {
        setError("");
        setLoading(true);
        await signUp(email, password);
        history.push("/");
      } catch {
        setError("Failed to create an account");
      }
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
