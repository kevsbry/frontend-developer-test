import React, { ComponentType } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../global-states";

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const dispatch = useDispatch();
  const authenticationStauts = useSelector(
    (state: RootState) => state.authenticationStatus
  );

  dispatch({ type: "CHECK_LOGIN_STATUS" });

  if (authenticationStauts === "logged-in") {
    return <Redirect to="/devices" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
