import { AppThunk } from "../types";
import { clientFetch } from "../../utils/clientFetch";
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
  VOTE_POST_REQUEST,
  VOTE_POST_SUCCESS,
  VOTE_POST_FAILURE,
} from "./constants";
import { Post, PostVote, PostActionTypes } from "./types";
import { User } from "../auth/types";
import { Community } from "../community/types";

const createPostRequest = (): PostActionTypes => ({
  type: CREATE_POST_REQUEST,
});

const createPostSuccess = (post: Post): PostActionTypes => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

const createPostFailure = (error: any): PostActionTypes => ({
  type: CREATE_POST_FAILURE,
  error,
});

const readPostsRequest = (): PostActionTypes => ({
  type: READ_POSTS_REQUEST,
});

const readPostsSuccess = (data: {
  posts: Post[];
  users: User[];
  communities: Community[];
  postVotes: PostVote[];
}): PostActionTypes => ({
  type: READ_POSTS_SUCCESS,
  posts: data.posts,
  users: data.users,
  communities: data.communities,
  postVotes: data.postVotes,
});

const readPostsFailure = (error: any): PostActionTypes => ({
  type: READ_POSTS_FAILURE,
  error,
});

const votePostRequest = (): PostActionTypes => ({
  type: VOTE_POST_REQUEST,
});

const votePostSuccess = (data: {
  postVote: PostVote;
  action: string;
}): PostActionTypes => ({
  type: VOTE_POST_SUCCESS,
  postVote: data.postVote,
  voteAction: data.action,
});

const votePostFailure = (error: any): PostActionTypes => ({
  type: VOTE_POST_FAILURE,
  error,
});

export const createPostAction = <T>(
  body: T,
  cb: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(createPostRequest());
    const { success, res } = await clientFetch("/api/post", { body });
    if (success) {
      dispatch(createPostSuccess(res.post));
      cb();
    } else {
      dispatch(createPostFailure(res));
    }
  } catch (err) {
    dispatch(createPostFailure(`Failed to create post: ${err}`));
  }
};

export const readPostsAction = (
  communities: string[] = [],
  cursor?: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(readPostsRequest());

    let endpoint = "/api/post";
    if (communities.length > 0 || cursor) {
      endpoint += "?";
    }
    communities.forEach((c, index) => {
      endpoint += `community=${c}${
        index === communities.length - 1 ? "" : "&"
      }`;
    });
    if (cursor) {
      endpoint += `&cursor=${cursor}`;
    }

    const { success, res } = await clientFetch(endpoint);
    if (success) {
      dispatch(readPostsSuccess(res.data));
    } else {
      dispatch(readPostsFailure(res));
    }
  } catch (err) {
    dispatch(readPostsFailure(`Failed to read posts: ${err}`));
  }
};

export const votePostAction = (body: {
  post_id: number;
  vote: number;
}): AppThunk => async (dispatch) => {
  try {
    dispatch(votePostRequest());
    const { success, res } = await clientFetch("/api/post/vote", { body });
    if (success) {
      dispatch(votePostSuccess(res));
    } else {
      dispatch(votePostFailure(res));
    }
  } catch (err) {
    dispatch(votePostFailure(`Failed to vote post: ${err}`));
  }
};
