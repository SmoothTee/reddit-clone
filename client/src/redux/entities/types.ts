import { User } from "../auth/types";
import { Community } from "../community/types";
import { Post, PostVote } from "../post/types";
import { PostComment } from "../comment/types";

export interface UserEntityState {
  byId: {
    [key: number]: User;
  };
}

export interface CommunityEntityState {
  byId: {
    [key: number]: Community;
  };
}

export interface PostEntityState {
  byId: {
    [key: number]: Post;
  };
}

export interface PostVoteEntityState {
  byPostId: {
    [key: number]: {
      [key: number]: PostVote;
    };
  };
}

export interface CommentEntityState {
  byId: {
    [key: number]: PostComment;
  };
}
