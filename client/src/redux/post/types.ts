import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
} from "./constants";
import { Community } from "../community/types";
import { User } from "../auth/types";

export interface Post {
  id: number;
  author_id: number;
  community_id: number;
  title: string;
  body?: string;
  numOfComments: number;
  created_at: string;
  updated_at: string;
}

export interface PostVote {
  user_id: number;
  post_id: number;
  vote: number;
  created_at: string;
  updated_at: string;
}

export interface HomePostsState {
  items: number[];
  isFetching: boolean;
  cursor: string | null;
}

interface CreatePostRequestAction {
  type: typeof CREATE_POST_REQUEST;
}

interface CreatePostSuccessAction {
  type: typeof CREATE_POST_SUCCESS;
  payload: Post;
}

interface CreatePostFailureAction {
  type: typeof CREATE_POST_FAILURE;
  error: any;
}

interface ReadPostsRequestAction {
  type: typeof READ_POSTS_REQUEST;
}

interface ReadPostsSuccessAction {
  type: typeof READ_POSTS_SUCCESS;
  posts: Post[];
  users: User[];
  communities: Community[];
  postVotes: PostVote[];
}

interface ReadPostsFailureAction {
  type: typeof READ_POSTS_FAILURE;
  error: any;
}

export type PostActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | ReadPostsRequestAction
  | ReadPostsSuccessAction
  | ReadPostsFailureAction;
