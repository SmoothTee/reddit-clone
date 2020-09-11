import {
  VOTE_COMMENT_FAILURE,
  VOTE_COMMENT_REQUEST,
  VOTE_COMMENT_SUCCESS,
} from "./constants";

export interface PostComment {
  parent_id?: number;
  id: number;
  author_id: number;
  body: string;
  path: number[];
  depth: number;
  created_at: string;
  updated_at: string;
  children?: PostComment[];
}

export interface CommentVote {
  comment_id: number;
  user_id: number;
  vote: number;
  created_at: string;
  updated_at: string;
}

export interface CommentState {
  items: number[];
  isFetching: boolean;
}

export interface CommentsByPostState {
  [key: number]: CommentState;
}

interface VoteCommentRequestAction {
  type: typeof VOTE_COMMENT_REQUEST;
}

interface VoteCommentSuccessAction {
  type: typeof VOTE_COMMENT_SUCCESS;
  commentVote: CommentVote;
  voteAction: string;
}

interface VoteCommentFailureAction {
  type: typeof VOTE_COMMENT_FAILURE;
  error: any;
}

export type CommentActionTypes =
  | VoteCommentRequestAction
  | VoteCommentSuccessAction
  | VoteCommentFailureAction;
