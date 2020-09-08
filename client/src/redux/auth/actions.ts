import { User, AuthActionTypes } from "./types";
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./constants";
import { AppThunk } from "../types";
import { clientFetch } from "../../utils/clientFetch";
import { resetError } from "../error/actions";
import { hideModal } from "../modal/actions";

const registerRequest = (): AuthActionTypes => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (payload: User): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload,
});

const registerFailure = (error: any): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  error,
});

const logoutRequest = (): AuthActionTypes => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = (): AuthActionTypes => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = (error?: any): AuthActionTypes => ({
  type: LOGOUT_FAILURE,
  error,
});

export const registerAction = <T>(body: T): AppThunk => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { success, res } = await clientFetch<T>("/api/auth/register", {
      body,
    });
    if (success) {
      console.log("Reset Error");
      dispatch(resetError());
      console.log("Hide Modal");
      dispatch(hideModal());
      dispatch(registerSuccess(res.user));
    } else {
      dispatch(registerFailure(res));
    }
  } catch (err) {
    dispatch(registerFailure(`Failed to register: ${err}`));
  }
};

export const logoutAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { success, res } = await clientFetch("/api/auth/logout");
    if (success && res.success) {
      dispatch(logoutSuccess());
    } else {
      dispatch(logoutFailure());
    }
  } catch (err) {
    dispatch(logoutFailure(`Failed to logout: ${err}`));
  }
};
