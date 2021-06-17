import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Theme,
  Button,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

interface LoginCardProps {
  isLoading: boolean;
  onLogin: (email: string, password: string) => void;
  isError: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardTitle: {
    fontWeight: "lighter",
    color: "#515151",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  loginButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#0177BD",
    color: "#fff",
  },
}));

const LoginCard = ({ isLoading, onLogin, isError }: LoginCardProps) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Typography className={classes.cardTitle} variant="h4" align="center">
            Login
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin(email ?? "", password ?? "");
            }}
          >
            <TextField
              className={classes.textField}
              label="Email Address"
              variant="filled"
              type="email"
              required={true}
              fullWidth={true}
              error={isError}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              className={classes.textField}
              label="Password"
              variant="filled"
              type="password"
              required={true}
              fullWidth={true}
              error={isError}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Grid container justify="center">
              <Button
                type="submit"
                className={classes.loginButton}
                variant="contained"
                disabled={isLoading}
              >
                LOG IN
              </Button>
            </Grid>
          </form>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
