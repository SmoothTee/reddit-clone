import { READ_POST_SUCCESS } from "../post/constants";
import { ActionTypes } from "../types";
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
    default:
      return state;
  }
};
