import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Divider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
const googleIcon =
  "https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20190925201609%21Google_%22G%22_Logo.svg";

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

export const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, loginWithGoogle } = useAuth();
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email && password) {
      try {
        setError("");
        setLoading(true);
        await signIn(email, password);
        setLoading(false);
        history.push("/");
      } catch {
        setError("Failed to log in");
        setLoading(false);
      }
    }
  }

  async function onLoginWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                onClick={onLoginWithGoogle}
                disabled={loading}
                fullWidth
                variant="contained"
                className={classes.googleSignIn}
              >
                <img src={googleIcon} width={25} height={25} />
                Sign in with Google
              </Button>
            </Grid>
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
          </Grid>
          <Button
            onClick={(e) => handleSubmit(e)}
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup">No account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
