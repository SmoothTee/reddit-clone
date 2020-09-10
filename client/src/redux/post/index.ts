import { PostActionTypes, HomePostsState, PostDiscussionState } from "./types";
import {
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POST_REQUEST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
} from "./constants";

export const postsByCommunity = (state: {}, action: PostActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialHomePostsState: HomePostsState = {
  items: [],
  isFetching: false,
  cursor: null,
};

export const homePosts = (
  state = initialHomePostsState,
  action: PostActionTypes
) => {
  switch (action.type) {
    case READ_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.posts.map((p) => p.id),
      };
    case READ_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const postDiscussionInitialState: PostDiscussionState = {
  item: null,
  isFetching: false,
};

export const postDiscussion = (
  state = postDiscussionInitialState,
  action: PostActionTypes
) => {
  switch (action.type) {
    case READ_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READ_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        item: action.post.id,
      };
    case READ_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
