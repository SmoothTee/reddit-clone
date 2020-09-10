import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";
import { CommunityState, MemberCommunityState } from "./community/types";
import {
  CommunityEntityState,
  UserEntityState,
  PostEntityState,
  PostVoteEntityState,
} from "./entities/types";
import { HomePostsState } from "./post/types";

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
  };
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
