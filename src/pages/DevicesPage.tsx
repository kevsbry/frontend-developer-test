import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Theme,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { getDevices } from "../global-states/thunks";
import { RootState } from "../global-states";
import { notify } from "../global-states/thunks";

const useStyles = makeStyles((theme: Theme) => ({
  devicesText: {
    color: "#fff",
    textTransform: "uppercase",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  circleContainer: {
    position: "absolute",
    width: 200,
    height: 200,
    left: "50%",
    top: "20%",

    transform: "rotate(-180deg)",
    transformOrigin: "bottom left",
    transition: "transform 2000ms linear",
  },
  circleContainer1: {
    position: "absolute",
    width: 200,
    height: 200,
    left: "50%",
    bottom: "20%",

    transform: "rotate(-180deg)",
    transformOrigin: "top left",
    transition: "transform 2500ms linear",
  },
  circle: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: "50px",
    height: "50px",
  },
  circle1: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: "50px",
    height: "50px",
  },
  rotateCircle: {
    transform: "rotate(180deg)",
    transformOrigin: "bottom left",
    transition: "transform 2000ms linear",
  },
  rotateCircle1: {
    transform: "rotate(180deg)",
    transformOrigin: "top left",
    transition: "transform 2000ms linear",
  },
}));

const DevicesPage = () => {
  const classes = useStyles();

  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRotating(isRotating ? false : true);
    }, 2500);
  }, [isRotating]);

  const dispatch = useDispatch();
  const numberOfDevices = useSelector(
    (state: RootState) => state.numberOfDevices
  );

  const notificationStatus = useSelector(
    (state: RootState) => state.notificationStatus
  );

  const loadingState = useSelector((state: RootState) => state.loadingState);

  useEffect(() => {
    setInterval(() => {
      dispatch(getDevices());
    }, 5000);
  }, [dispatch]);

  const onClickNotify = () => {
    const token = localStorage.getItem("jwt");
    dispatch(
      notify({
        name: "",
        email: "",
        message: "",
        repoUrl: "",
        token: token ?? "",
      })
    );
  };

  const onClickLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ width: "100vw", height: "100vh", backgroundColor: "#FF7043" }}
      >
        <Grid container item xl={12} justify="center" style={{ minHeight: 75 }}>
          {numberOfDevices.isLoading ? (
            <CircularProgress />
          ) : (
            <Typography
              className={classes.devicesText}
              variant="h2"
              align="center"
            >
              {numberOfDevices.data}
            </Typography>
          )}
        </Grid>

        <Grid item>
          <Typography
            className={classes.devicesText}
            align="center"
            variant="subtitle1"
          >
            Devices <br /> Online
          </Typography>
        </Grid>

        <Grid
          className={classes.buttonContainer}
          item
          container
          justify="center"
        >
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={onClickNotify}
            disabled={loadingState}
          >
            notify
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={onClickLogout}
            disabled={loadingState}
          >
            log out
          </Button>
        </Grid>

        <div
          className={`${classes.circleContainer} ${
            isRotating && classes.rotateCircle
          } `}
        >
          <div className={classes.circle} />
        </div>

        <div
          className={`${classes.circleContainer1} ${
            isRotating && classes.rotateCircle1
          } `}
        >
          <div className={classes.circle1} />
        </div>
      </Grid>

      <Snackbar
        open={notificationStatus.isSuccess !== undefined}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert severity={notificationStatus.isSuccess ? "success" : "error"}>
          {notificationStatus.isSuccess
            ? "Notification status sent"
            : "Something went wrong"}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default DevicesPage;
