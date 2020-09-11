import { READ_POST_SUCCESS } from "../post/constants";
import { ActionTypes } from "../types";
import { CREATE_COMMENT_SUCCESS } from "./constants";
import { CommentState, CommentsByPostState } from "./types";

const initialState: CommentState = {
  items: [],
  isFetching: false,
};

const comments = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POST_SUCCESS:
      return {
        ...state,
        items: action.comments.map((c) => c.id),
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        items: [action.comment.id, ...state.items],
      };
    default:
      return state;
  }
};

export const commentsByPost = (
  state: CommentsByPostState = {},
  action: ActionTypes
) => {
  switch (action.type) {
    case READ_POST_SUCCESS:
      return {
        ...state,
        [action.post.id]: comments(state[action.post.id], action),
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment.post_id]: comments(
          state[action.comment.post_id],
          action
        ),
      };
    default:
      return state;
  }
};
