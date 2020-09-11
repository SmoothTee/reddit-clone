import { PostComment } from "../redux/comment/types";

export const nestComments = (comments: PostComment[]) => {
  const commentMap: { [key: number]: PostComment } = {};

  // move all the comments into a map of id => comment
  comments.forEach((comment) => (commentMap[comment.id] = comment));

  // iterate over the comments again and correctly nest the children
  comments.forEach((comment) => {
    if (comment.depth !== 1 && comment.parent_id) {
      const parent = commentMap[comment.parent_id];
      (parent.children = parent.children || []).push(comment);
    }
  });

  // filter the list to return a list of correctly nested comments
  return comments.filter((comment) => {
    return comment.depth === 1;
  });
};
