import { REGISTER_REQUEST } from "./actions";

interface User {
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

export type AuthActionTypes = RegisterRequestAction;
