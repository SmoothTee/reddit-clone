import { combineReducers } from "redux";

import { READ_COMMUNITIES_SUCCESS } from "../community/constants";
import {
  CommunityActionTypes,
  ReadCommunitiesSuccessAction,
} from "../community/types";

const initialState = {
  byId: {},
};

const communities = (state = initialState, action: CommunityActionTypes) => {
  switch (action.type) {
    default:
    case READ_COMMUNITIES_SUCCESS:
      return {
        byId: Object.assign(
          {},
          state.byId,
          (action as ReadCommunitiesSuccessAction).communitiesById
        ),
      };
      return state;
  }
};

export const entities = combineReducers({
  communities,
});
