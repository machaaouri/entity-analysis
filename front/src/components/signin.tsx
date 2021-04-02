import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Hr, styledCard } from "./common";
import styled from "styled-components";
const googleIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png";

export const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, loginWithGoogle } = useAuth();
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await signIn(emailRef.current.value, passwordRef.current.value);
        setLoading(false);
        history.push("/");
      } catch {
        setError("Failed to log in");
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

  const googleButton: React.CSSProperties = {
    backgroundColor: "#FFF",
    width: "100%",
    color: "#000",
    border: "1px solid #ced4da",
  };

  const GoogleSignInIcon = styled.img.attrs({
    src: `${googleIcon}`,
  })`
    width: 25px;
    float: left;
  `;

  return (
    <Card style={styledCard}>
      <Card.Body>
        <h3 className="mb-3 text-center font-weight-normal">Sign in</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button
          style={googleButton}
          disabled={loading}
          onClick={onLoginWithGoogle}
        >
          <GoogleSignInIcon />
          Sign in with Google
        </Button>
        <Hr data-content="OR" />
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Control
              type="email"
              ref={emailRef}
              placeholder="Email address"
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Control
              type="password"
              ref={passwordRef}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="w-100 text-center mt-2">
          <Link to="/forgot-password">Forgot Password ?</Link>
        </div>
        <Hr />
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card.Body>
    </Card>
  );
};
