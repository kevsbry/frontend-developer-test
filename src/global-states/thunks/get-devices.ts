import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";

type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  null,
  {
    type: "SET_NUMBER_OF_DEVICES" | "FETCHING";
    payload?: string | number;
  }
>;

export const getDevices = (): ThunkResult<void> => {
  return (dispatch) => {
    dispatch({ type: "FETCHING" });

    axios
      .get("http://35.201.2.209:8000/devices")
      .then((res) => {
        dispatch({
          type: "SET_NUMBER_OF_DEVICES",
          payload: res.data.devices.length,
        });
      })
      .catch(() => {
        dispatch({ type: "SET_NUMBER_OF_DEVICES", payload: "ERROR" });
      });
  };
};
