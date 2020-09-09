import { AppThunk } from "../types";
import { clientFetch } from "../../utils/clientFetch";
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
} from "./constants";
import { Post, PostVote } from "./types";
import { User } from "../auth/types";
import { Community } from "../community/types";

const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

const createPostSuccess = (post: Post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

const createPostFailure = (error: any) => ({
  type: CREATE_POST_FAILURE,
  error,
});

const readPostsRequest = () => ({
  type: READ_POSTS_REQUEST,
});

const readPostsSuccess = (data: {
  posts: Post[];
  users: User[];
  communities: Community[];
  postVotes: PostVote[];
}) => ({
  type: READ_POSTS_SUCCESS,
  posts: data.posts,
  users: data.users,
  communities: data.communities,
  postVotes: data.postVotes,
});

const readPostsFailure = (error: any) => ({
  type: READ_POSTS_FAILURE,
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
