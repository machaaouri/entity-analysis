import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const UpdateProfile = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const history = useHistory();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value)
        return setError("Passwords do not match");

      setLoading(true);
      setError("");
      const promises = [];

      if (emailRef.current.value !== currentUser?.email)
        promises.push(updateEmail(emailRef.current.value));
      if (passwordRef.current.value)
        promises.push(updatePassword(passwordRef.current.value));

      Promise.all(promises)
        .then(() => history.push("/"))
        .catch(() => setError("Failed to update profile"))
        .finally(() => setLoading(false));

      try {
        setError("");
        setLoading(true);
        //await signup(emailRef.current.value, passwordRef.current.value)
        history.push("/");
      } catch {
        setError("Failed to create an account");
      }

      setLoading(false);
    }
  }

  return (
    <>
      {/* <Card style={styledCard}>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser?.email || undefined}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder={"Leave blank to keep the same"}
              />
            </Form.Group>
            <Form.Group id="password-confirmation">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder={"Leave blank to keep the same"}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card> */}
    </>
  );
};
