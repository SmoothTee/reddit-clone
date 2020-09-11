import { combineReducers } from "redux";

import { READ_COMMUNITIES_SUCCESS } from "../community/constants";
import { Community } from "../community/types";
import {
  CommunityEntityState,
  PostEntityState,
  UserEntityState,
  PostVoteEntityState,
  CommentEntityState,
} from "./types";
import {
  CREATE_POST_SUCCESS,
  READ_POSTS_SUCCESS,
  VOTE_POST_SUCCESS,
  READ_POST_SUCCESS,
} from "../post/constants";
import { PostActionTypes, Post, PostVote } from "../post/types";
import { ActionTypes } from "../types";
import { User } from "../auth/types";
import { PostComment } from "../comment/types";

const userInitialState: UserEntityState = {
  byId: {},
};

const users = (state = userInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        byId: {
          ...state.byId,
          ...action.users.reduce((acc: { [key: number]: User }, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {}),
        },
      };
    case READ_POST_SUCCESS:
      return {
        byId: {
          ...state.byId,
          ...action.users.reduce((acc: { [key: number]: User }, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {}),
        },
      };
    default:
      return state;
  }
};

const communityInitialState: CommunityEntityState = {
  byId: {},
};

const communities = (state = communityInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_COMMUNITIES_SUCCESS:
      return {
        byId: Object.assign({}, state.byId, action.communitiesById),
      };
    case READ_POSTS_SUCCESS:
      return {
        byId: {
          ...state.byId,
          ...action.communities.reduce(
            (acc: { [key: number]: Community }, curr) => {
              acc[curr.id] = curr;
              return acc;
            },
            {}
          ),
        },
      };
    case READ_POST_SUCCESS:
      return {
        byId: {
          ...state.byId,
          [action.community.id]: action.community,
        },
      };
    default:
      return state;
  }
};

const postInitialState: PostEntityState = {
  byId: {},
};

const posts = (state = postInitialState, action: PostActionTypes) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: action.payload,
        }),
      };
    case READ_POSTS_SUCCESS:
      return {
        byId: action.posts.reduce((acc: { [key: number]: Post }, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
      };
    case READ_POST_SUCCESS:
      return {
        byId: {
          ...state.byId,
          [action.post.id]: action.post,
        },
      };
    default:
      return state;
  }
};

const postVotesInitialState: PostVoteEntityState = {
  byPostId: {},
};

const postVotes = (state = postVotesInitialState, action: PostActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          ...action.postVotes.reduce(
            (acc: { [key: number]: { [key: number]: PostVote } }, curr) => {
              if (curr.post_id in acc) {
                acc[curr.post_id] = {
                  ...acc[curr.post_id],
                  [curr.user_id]: curr,
                };
              } else {
                acc[curr.post_id] = { [curr.user_id]: curr };
              }
              return acc;
            },
            {}
          ),
        },
      };
    case VOTE_POST_SUCCESS:
      const { postVote, voteAction } = action;
      if (voteAction === "c" || voteAction === "u") {
        const updated = state.byPostId[postVote.post_id]
          ? {
              ...state.byPostId[postVote.post_id],
              [postVote.user_id]: postVote,
            }
          : { [postVote.user_id]: postVote };

        return {
          byPostId: {
            ...state.byPostId,
            [postVote.post_id]: updated,
          },
        };
      }
      if (voteAction === "d") {
        const { [postVote.user_id]: omit, ...rest } = state.byPostId[
          postVote.post_id
        ];
        return {
          byPostId: {
            ...state.byPostId,
            [postVote.post_id]: rest,
          },
        };
      }
      break;
    case READ_POST_SUCCESS:
      return {
        byPostId: {
          ...state.byPostId,
          [action.post.id]: action.postVotes.reduce(
            (acc: { [key: number]: PostVote }, curr) => {
              acc[curr.user_id] = curr;
              return acc;
            },
            {}
          ),
        },
      };
    default:
      return state;
  }
};

const commentsInitialState: CommentEntityState = {
  byId: {},
};

const comments = (state = commentsInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POST_SUCCESS:
      return {
        byId: {
          ...state.byId,
          ...action.comments.reduce(
            (acc: { [key: number]: PostComment }, curr) => {
              acc[curr.id] = curr;
              return acc;
            },
            {}
          ),
        },
      };
    default:
      return state;
  }
};

export const entities = combineReducers({
  users,
  communities,
  posts,
  postVotes,
  comments,
});
