import { User } from "../auth/types";
import { Community } from "../community/types";
import { Post, PostVote } from "../post/types";

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
