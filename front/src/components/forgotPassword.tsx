import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (emailRef.current) {
      try {
        setError("");
        setMessage("");
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage("Check your inbox for further instructions");
      } catch {
        setError("Failed to reset password");
      }

      setLoading(false);
    }
  }

  return (
    // <Card style={styledCard}>
    //   <Card.Body>
    //     <h2 className="text-center mb-4">Password Reset</h2>
    //     {error && <Alert variant="danger">{error}</Alert>}
    //     {message && <Alert variant="success">{message}</Alert>}
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group id="email">
    //         <Form.Control
    //           type="email"
    //           ref={emailRef}
    //           placeholder="Email address"
    //           required
    //         />
    //       </Form.Group>
    //       <Button disabled={loading} className="w-100" type="submit">
    //         Reset Password
    //       </Button>
    //     </Form>
    //     <div className="w-100 text-center mt-2">
    //       <Link to="/login">Log In</Link>
    //     </div>
    //     <Hr />
    //     <div className="w-100 text-center mt-2">
    //       Need an account? <Link to="/signup">Sign Up</Link>
    //     </div>
    //   </Card.Body>
    // </Card>
    null
  );
};
