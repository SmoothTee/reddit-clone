import { AuthState, AuthActionTypes } from "./types";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./constants";

const initialState: AuthState = {
  session: null,
  isAuthenticated: false,
  isFetching: false,
  didRequest: false,
};

export const auth = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        session: action.payload,
        isAuthenticated: true,
        isFetching: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
