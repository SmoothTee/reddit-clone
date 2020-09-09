import { CREATE_POST_REQUEST } from "./constants";

interface CreatePostRequestAction {
  type: typeof CREATE_POST_REQUEST;
}

export type PostActionTypes = CreatePostRequestAction;
