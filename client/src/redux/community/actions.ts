import { clientFetch } from "../../utils/clientFetch";
import { AppThunk } from "../types";
import {
  READ_COMMUNITIES_REQUEST,
  READ_COMMUNITIES_SUCCESS,
  READ_COMMUNITIES_FAILURE,
  JOIN_COMMUNITY_REQUEST,
  JOIN_COMMUNITY_SUCCESS,
  JOIN_COMMUNITY_FAILURE,
} from "./constants";
import { Community, CommunityMember, CommunityActionTypes } from "./types";

const readCommunitiesRequest = (): CommunityActionTypes => ({
  type: READ_COMMUNITIES_REQUEST,
});

const readCommunitiesSuccess = (
  communities: Community[]
): CommunityActionTypes => {
  const communitiesById = communities.reduce(
    (acc: { [key: number]: any }, curr) => {
      acc[curr.id] = curr;
      return acc;
    },
    {}
  );

  return {
    type: READ_COMMUNITIES_SUCCESS,
    communitiesById,
    communities: Object.keys(communitiesById).map(Number),
  };
};

const readCommunitiesFailure = (error: any): CommunityActionTypes => ({
  type: READ_COMMUNITIES_FAILURE,
  error,
});

const joinCommunityRequest = (communityId: number): CommunityActionTypes => ({
  type: JOIN_COMMUNITY_REQUEST,
  communityId,
});

const joinCommunitySuccess = (
  communityMember: CommunityMember
): CommunityActionTypes => ({
  type: JOIN_COMMUNITY_SUCCESS,
  communityMember,
});

const joinCommunityFailure = (error: any): CommunityActionTypes => ({
  type: JOIN_COMMUNITY_FAILURE,
  error,
});

export const readCommunitiesAction = (
  notMember: boolean = false
): AppThunk => async (dispatch) => {
  try {
    dispatch(readCommunitiesRequest());
    const { success, res } = await clientFetch(
      `/api/community${notMember ? "?not_member=true" : ""}`
    );
    if (success) {
      dispatch(readCommunitiesSuccess(res.communities));
    } else {
      dispatch(readCommunitiesFailure(res));
    }
  } catch (err) {
    dispatch(readCommunitiesFailure(`Failed to read communities: ${err}`));
  }
};

export const joinCommunityAction = (communityId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(joinCommunityRequest(communityId));
    const { success, res } = await clientFetch("/api/community/become-member", {
      body: { communityId },
    });
    if (success) {
      dispatch(joinCommunitySuccess(res.communityMember));
    } else {
      dispatch(joinCommunityFailure(res));
    }
  } catch (err) {
    dispatch(joinCommunityFailure(`Failed to join community: ${err}`));
  }
};
