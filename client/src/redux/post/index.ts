import { PostActionTypes } from "./types";
import {
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
} from "./constants";

export const postsByCommunity = (state: {}, action: PostActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialHomePostsState = {
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
