import { Community } from "../community/types";

export interface CommunityEntityState {
  byId: {
    [key: number]: Community;
  };
}
