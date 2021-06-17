import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";

type Actions =
  | {
      type: "START_LOADING" | "STOP_LOADING";
    }
  | { type: "LOGIN_STATUS_SUCCESS" }
  | { type: "LOGIN_STATUS_ERROR"; payload: { errMessage: string } }
  | {
      type: "LOGIN_USER" | "LOGOUT_USER" | "CHECK_LOGIN_STATUS";
      payload?: { jwt: string };
    };

type ThunkResult<R> = ThunkAction<R, RootState, null, Actions>;

export const login = (email: string, password: string): ThunkResult<void> => {
  return (dispatch) => {
    dispatch({ type: "START_LOADING" });
    axios
      .post("http://35.201.2.209:8000/login", {
        email,
        password,
      })
      .then((res) => {
        if (res !== null || res !== undefined) {
          dispatch({ type: "LOGIN_USER", payload: { jwt: res.data } });
          dispatch({ type: "LOGIN_STATUS_SUCCESS" });
          dispatch({ type: "STOP_LOADING" });
        }
      })
      .catch(async (err) => {
        if (
          (await err.response) !== null ||
          (await err.response) !== undefined
        ) {
          dispatch({
            type: "LOGIN_STATUS_ERROR",
            payload: { errMessage: err.response.data },
          });
          dispatch({ type: "STOP_LOADING" });
        }
      });
  };
};
