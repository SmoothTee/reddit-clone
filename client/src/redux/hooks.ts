import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";
import { CommunityState, MemberCommunityState } from "./community/types";
import {
  CommunityEntityState,
  UserEntityState,
  PostEntityState,
  PostVoteEntityState,
  CommentEntityState,
} from "./entities/types";
import { HomePostsState, PostDiscussionState } from "./post/types";
import { CommentsByPostState } from "./comment/types";

interface RootState {
  modal: ModalState;
  auth: AuthState;
  community: CommunityState;
  memberCommunity: MemberCommunityState;
  homePosts: HomePostsState;
  entities: {
    users: UserEntityState;
    communities: CommunityEntityState;
    posts: PostEntityState;
    postVotes: PostVoteEntityState;
    comments: CommentEntityState;
  };
  postDiscussion: PostDiscussionState;
  commentsByPost: CommentsByPostState;
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
