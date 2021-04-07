import React, { ReactNode } from "react";
import { AuthProvider } from "./contexts/authContext";
import { Signup } from "./components/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import { SignIn } from "./components/signin";
import { PrivateRoute } from "./components/privateRoute";
import { ForgotPassword } from "./components/forgotPassword";
import { UpdateProfile } from "./components/updateProfile";
import { Admin } from "./components/admin";
import { CssBaseline } from "@material-ui/core";

const Auth = (p: { children: ReactNode }) => {
  return <div>{p.children}</div>;
};

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Auth>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Auth>
        </Switch>
      </AuthProvider>
    </Router>
  );
};
