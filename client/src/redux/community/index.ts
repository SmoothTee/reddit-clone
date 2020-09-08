import { CommunityState, CommunityActionTypes } from "./types";
import {
  READ_COMMUNITIES_REQUEST,
  READ_COMMUNITIES_SUCCESS,
  READ_COMMUNITIES_FAILURE,
} from "./constants";

const initialState: CommunityState = {
  items: [],
  isFetching: false,
};

export const community = (
  state = initialState,
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
