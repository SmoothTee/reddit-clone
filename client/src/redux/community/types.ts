import {
  READ_COMMUNITIES_REQUEST,
  READ_COMMUNITIES_SUCCESS,
  READ_COMMUNITIES_FAILURE,
} from "./constants";

export interface Community {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityState {
  items: number[];
  isFetching: boolean;
}

interface ReadCommunitiesRequestAction {
  type: typeof READ_COMMUNITIES_REQUEST;
}

export interface ReadCommunitiesSuccessAction {
  type: typeof READ_COMMUNITIES_SUCCESS;
  communities: number[];
  communitiesById: { [key: number]: Community };
}

interface ReadCommunitiesFailureAction {
  type: typeof READ_COMMUNITIES_FAILURE;
  error: any;
}

export type CommunityActionTypes =
  | ReadCommunitiesRequestAction
  | ReadCommunitiesSuccessAction
  | ReadCommunitiesFailureAction;
