import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { auth } from "./auth";
import { AppReducerParameters } from "./types";
import { LOGOUT_SUCCESS } from "./auth/actions";

export const appReducer = combineReducers({
  auth,
});

const rootReducer = (
  state: AppReducerParameters[0],
  action: AppReducerParameters[1]
) => {
  if (action.type === LOGOUT_SUCCESS) state = undefined;

  return appReducer(state, action);
};

const middlewares = [reduxThunk];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
