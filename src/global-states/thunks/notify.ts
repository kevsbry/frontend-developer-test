import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";

type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  null,
  | {
      type: "START_LOADING" | "STOP_LOADING";
    }
  | { type: "NOTIFICATION_SUCCESS" | "NOTIFICATION_ERROR" }
  | { type: "LOGOUT_USER" }
>;

interface NotifyParams {
  name: string;
  email: string;
  repoUrl: string;
  message: string;
  token: string;
}

export const notify = ({
  name,
  email,
  repoUrl,
  message,
  token,
}: NotifyParams): ThunkResult<void> => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "START_LOADING" });

    axios
      .post(
        "http://35.201.2.209:8000/notify",
        {
          name,
          email,
          repoUrl,
          message,
        },
        headers
      )
      .then((res) => {
        dispatch({ type: "NOTIFICATION_SUCCESS" });
        dispatch({ type: "STOP_LOADING" });
      })
      .catch((err) => {
        dispatch({ type: "NOTIFICATION_ERROR" });
        dispatch({ type: "STOP_LOADING" });

        if (err.response.status === 401) {
          dispatch({ type: "LOGOUT_USER" });
        }
      });
  };
};
