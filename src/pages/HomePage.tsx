import React from "react";
import { Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { LoginCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../global-states";
import { login } from "../global-states/thunks";

const HomePage = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state: RootState) => state.loadingState);
  const loginStatus = useSelector((state: RootState) => state.loginStatus);

  const onLogin = (email: string, password: string) => {
    dispatch(login(email, password));
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#253237" }}
    >
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <LoginCard
          isLoading={loadingState}
          onLogin={onLogin}
          isError={loginStatus.isError ?? false}
        />
      </Grid>

      <Snackbar open={loginStatus.isError}>
        <MuiAlert severity="error">{loginStatus.errorMessage}</MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default HomePage;
