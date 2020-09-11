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
  READ_POST_REQUEST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
} from "./constants";
import { Community } from "../community/types";
import { User } from "../auth/types";
import { CommentVote, PostComment } from "../comment/types";

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

export interface PostDiscussionState {
  item: number | null;
  isFetching: boolean;
}

export interface CommunityPostsState {
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
  community?: string;
}

interface ReadPostsFailureAction {
  type: typeof READ_POSTS_FAILURE;
  error: any;
}

interface ReadPostRequestAction {
  type: typeof READ_POST_REQUEST;
}

interface ReadPostSuccessAction {
  type: typeof READ_POST_SUCCESS;
  post: Post;
  users: User[];
  community: Community;
  postVotes: PostVote[];
  comments: PostComment[];
  commentVotes: CommentVote[];
}

interface ReadPostFailureAction {
  type: typeof READ_POST_FAILURE;
  error: any;
}

interface VotePostRequestAction {
  type: typeof VOTE_POST_REQUEST;
}

interface VotePostSuccessAction {
  type: typeof VOTE_POST_SUCCESS;
  postVote: PostVote;
  voteAction: string;
}

interface VotePostFailureAction {
  type: typeof VOTE_POST_FAILURE;
  error: any;
}

export type PostActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | ReadPostsRequestAction
  | ReadPostsSuccessAction
  | ReadPostsFailureAction
  | ReadPostRequestAction
  | ReadPostSuccessAction
  | ReadPostFailureAction
  | VotePostRequestAction
  | VotePostSuccessAction
  | VotePostFailureAction;
