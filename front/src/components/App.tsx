import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/authContext";
import { Signup } from "./signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { SignIn } from "./signin";
import { PrivateRoute } from "./privateRoute";
import { ForgotPassword } from "./forgotPassword";
import { UpdateProfile } from "./updateProfile";
import { Admin } from "./admin";

const Auth = (p: { children: ReactNode }) => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {p.children}
      </div>
    </Container>
  );
};

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Auth>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={SignIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Auth>
        </Switch>
      </AuthProvider>
    </Router>
  );
};
