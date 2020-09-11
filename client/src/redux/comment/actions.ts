import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { AppThunk } from "../types";
import {
  VOTE_COMMENT_REQUEST,
  VOTE_COMMENT_SUCCESS,
  VOTE_COMMENT_FAILURE,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "./constants";
import { CommentVote, CommentActionTypes, PostComment } from "./types";

const voteCommentRequest = (): CommentActionTypes => ({
  type: VOTE_COMMENT_REQUEST,
});

const voteCommentSuccess = (data: {
  commentVote: CommentVote;
  action: string;
}): CommentActionTypes => ({
  type: VOTE_COMMENT_SUCCESS,
  commentVote: data.commentVote,
  voteAction: data.action,
});

const voteCommentFailure = (error: any): CommentActionTypes => ({
  type: VOTE_COMMENT_FAILURE,
  error,
});

const createCommentRequest = (): CommentActionTypes => ({
  type: CREATE_COMMENT_REQUEST,
});

const createCommentSuccess = (body: {
  comment: PostComment;
  user: User;
}): CommentActionTypes => ({
  type: CREATE_COMMENT_SUCCESS,
  comment: body.comment,
  user: body.user,
});

const createCommentFailure = (error: any): CommentActionTypes => ({
  type: CREATE_COMMENT_FAILURE,
  error,
});

export const voteCommentAction = (body: {
  comment_id: number;
  vote: number;
}): AppThunk => async (dispatch) => {
  try {
    dispatch(voteCommentRequest());
    const { success, res } = await clientFetch("/api/comment/vote", { body });
    if (success) {
      dispatch(voteCommentSuccess(res));
    } else {
      dispatch(voteCommentFailure(res));
    }
  } catch (err) {
    dispatch(voteCommentFailure(`Failed to vote comment: ${err}`));
  }
};

export const createCommentAction = (
  body: {
    parent_id?: number;
    post_id: number;
    body: string;
  },
  cb: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(createCommentRequest());
    const { success, res } = await clientFetch("/api/comment", { body });
    if (success) {
      dispatch(createCommentSuccess(res));
      cb();
    } else {
      dispatch(createCommentFailure(res));
    }
  } catch (err) {
    dispatch(createCommentFailure(`Failed to create comment: ${err}`));
  }
};
