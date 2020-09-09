import { combineReducers } from "redux";

import { READ_COMMUNITIES_SUCCESS } from "../community/constants";
import { CommunityActionTypes } from "../community/types";
import {
  CommunityEntityState,
  PostEntityState,
  UserEntityState,
} from "./types";
import { CREATE_POST_SUCCESS, READ_POSTS_SUCCESS } from "../post/constants";
import { PostActionTypes, Post } from "../post/types";
import { ActionTypes } from "../types";
import { User } from "../auth/types";

const userInitialState: UserEntityState = {
  byId: {},
};

const users = (state = userInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        byId: {
          ...state.byId,
          ...action.users.reduce((acc: { [key: number]: User }, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {}),
        },
      };
    default:
      return state;
  }
};

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
        byId: Object.assign({}, state.byId, action.communitiesById),
      };
    default:
      return state;
  }
};

const postInitialState: PostEntityState = {
  byId: {},
};

const posts = (state = postInitialState, action: PostActionTypes) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: action.payload,
        }),
      };
    case READ_POSTS_SUCCESS:
      return {
        byId: action.posts.reduce((acc: { [key: number]: Post }, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
      };
    default:
      return state;
  }
};

export const entities = combineReducers({
  users,
  communities,
  posts,
});
