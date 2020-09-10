import {
  READ_COMMUNITIES_REQUEST,
  READ_COMMUNITIES_SUCCESS,
  READ_COMMUNITIES_FAILURE,
  JOIN_COMMUNITY_REQUEST,
  JOIN_COMMUNITY_SUCCESS,
  JOIN_COMMUNITY_FAILURE,
} from "./constants";

export interface Community {
  id: number;
  user_id: number;
  name: string;
  numOfMembers: number;
  created_at: string;
  updated_at: string;
}

export interface CommunityMember {
  user_id: number;
  community_id: number;
  created_at: string;
  updated_at: string;
}

export interface CommunityState {
  items: number[];
  isFetching: boolean;
}

export interface MemberCommunityState extends CommunityState {
  fetchingId: number | null;
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

interface JoinCommunityRequestAction {
  type: typeof JOIN_COMMUNITY_REQUEST;
  communityId: number;
}

interface JoinCommunitySuccessAction {
  type: typeof JOIN_COMMUNITY_SUCCESS;
  communityMember: CommunityMember;
}

interface JoinCommunityFailureAction {
  type: typeof JOIN_COMMUNITY_FAILURE;
  error: any;
}

export type CommunityActionTypes =
  | ReadCommunitiesRequestAction
  | ReadCommunitiesSuccessAction
  | ReadCommunitiesFailureAction
  | JoinCommunityRequestAction
  | JoinCommunitySuccessAction
  | JoinCommunityFailureAction;
