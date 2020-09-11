import { clientFetch } from "../../utils/clientFetch";
import { AppThunk } from "../types";
import {
  VOTE_COMMENT_REQUEST,
  VOTE_COMMENT_SUCCESS,
  VOTE_COMMENT_FAILURE,
} from "./constants";
import { CommentVote, CommentActionTypes } from "./types";

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
