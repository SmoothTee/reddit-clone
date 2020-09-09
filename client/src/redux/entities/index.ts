import { combineReducers } from "redux";

import { READ_COMMUNITIES_SUCCESS } from "../community/constants";
import {
  CommunityActionTypes,
  ReadCommunitiesSuccessAction,
} from "../community/types";
import { CommunityEntityState } from "./types";

const communityInitialState: CommunityEntityState = {
  byId: {},
};

const communities = (
  state = communityInitialState,
  action: CommunityActionTypes
) => {
  switch (action.type) {
    case READ_COMMUNITIES_SUCCESS:
      return {
        byId: Object.assign(
          {},
          state.byId,
          (action as ReadCommunitiesSuccessAction).communitiesById
        ),
      };
    default:
      return state;
  }
};

export const entities = combineReducers({
  communities,
});
