import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute = (p: PrivateRouteProps) => {
  const { currentUser } = useAuth();
  const { component: Component, ...rest } = p;
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};
