export interface PostComment {
  parent_id?: number;
  id: number;
  author_id: number;
  body: string;
  path: number[];
  depth: number;
  created_at: string;
  updated_at: string;
}

export interface CommentState {
  items: number[];
  isFetching: boolean;
}

export interface CommentsByPostState {
  [key: number]: CommentState;
}
