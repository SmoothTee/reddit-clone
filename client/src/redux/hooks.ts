import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";
import { CommunityState } from "./community/types";
import { CommunityEntityState } from "./entities/types";

interface RootState {
  modal: ModalState;
  auth: AuthState;
  community: CommunityState;
  entities: {
    communities: CommunityEntityState;
  };
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
