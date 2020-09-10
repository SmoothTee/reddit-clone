import {
  CommunityState,
  CommunityActionTypes,
  MemberCommunityState,
} from "./types";
import {
  READ_COMMUNITIES_REQUEST,
  READ_COMMUNITIES_SUCCESS,
  READ_COMMUNITIES_FAILURE,
  JOIN_COMMUNITY_REQUEST,
  JOIN_COMMUNITY_SUCCESS,
  JOIN_COMMUNITY_FAILURE,
} from "./constants";
import { LOGIN_SUCCESS, ME_SUCCESS } from "../auth/constants";
import { ActionTypes } from "../types";

const communityInitialState: CommunityState = {
  items: [],
  isFetching: false,
};

export const community = (
  state = communityInitialState,
  action: CommunityActionTypes
) => {
  switch (action.type) {
    case READ_COMMUNITIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READ_COMMUNITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.communities,
      };
    case READ_COMMUNITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const memberCommunityInitialState: MemberCommunityState = {
  items: [],
  isFetching: false,
  fetchingId: null,
};

export const memberCommunity = (
  state = memberCommunityInitialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case JOIN_COMMUNITY_REQUEST:
      return {
        ...state,
        isFetching: true,
        fetchingId: action.communityId,
      };
    case LOGIN_SUCCESS:
    case ME_SUCCESS:
      return {
        ...state,
        items: action.payload.memberCommunity,
      };
    case JOIN_COMMUNITY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchingId: null,
        items: [...state.items, action.communityMember.community_id],
      };
    case JOIN_COMMUNITY_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchingId: null,
      };
    default:
      return state;
  }
};
