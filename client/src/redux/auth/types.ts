import {
  REGISTER_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
} from "./constants";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  session: User | null;
  isAuthenticated: boolean;
  isFetching: boolean;
  didRequest: boolean;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: User;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: any;
}

interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: any;
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;
