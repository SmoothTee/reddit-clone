import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { auth } from "./auth";
import { modal } from "./modal";
import { error } from "./error";
import { community } from "./community";
import { entities } from "./entities";
import { AppReducerParameters } from "./types";
import { LOGOUT_SUCCESS } from "./auth/constants";

export const appReducer = combineReducers({
  auth,
  modal,
  error,
  community,
  entities,
});

const rootReducer = (
  state: AppReducerParameters[0],
  action: AppReducerParameters[1]
) => {
  if (action.type === LOGOUT_SUCCESS) window.location.reload();

  return appReducer(state, action);
};

const middlewares = [reduxThunk];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
