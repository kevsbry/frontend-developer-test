import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  loadingState,
  loginStatus,
  authenticationStatus,
  numberOfDevices,
  notificationStatus,
} from "./reducers";

const reducers = combineReducers({
  loadingState,
  loginStatus,
  authenticationStatus,
  numberOfDevices,
  notificationStatus,
});

export const store = createStore(reducers, applyMiddleware(thunk));
export type RootState = ReturnType<typeof reducers>;
