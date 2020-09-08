import { clientFetch } from "../../utils/clientFetch";
import { AppThunk } from "../types";
import {
  READ_COMMUNITIES_REQUEST,
  READ_COMMUNITIES_SUCCESS,
  READ_COMMUNITIES_FAILURE,
} from "./constants";
import { Community } from "./types";

const readCommunitiesRequest = () => ({
  type: READ_COMMUNITIES_REQUEST,
});

const readCommunitiesSuccess = (communities: Community[]) => {
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
    communities: Object.keys(communitiesById),
  };
};

const readCommunitiesFailure = (error: any) => ({
  type: READ_COMMUNITIES_FAILURE,
  error,
});

export const readCommunitiesAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(readCommunitiesRequest());
    const { success, res } = await clientFetch("/api/community");
    if (success) {
      dispatch(readCommunitiesSuccess(res.communities));
    } else {
      dispatch(readCommunitiesFailure(res));
    }
  } catch (err) {
    dispatch(readCommunitiesFailure(`Failed to read communities: ${err}`));
  }
};
