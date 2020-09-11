import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./PostDiscussion.module.css";
import { readPostAction } from "../../redux/post/actions";
import { PostCard } from "../../components/PostCard";
import { useTypedSelector } from "../../redux/hooks";
import { Comment } from "../../components/Comment";
import { nestComments } from "../../utils/nestComments";
import { NoComments } from "./components/NoComments";
import { CommentEditor } from "../../components/CommentEditor";

export const PostDiscussion = () => {
  const dispatch = useDispatch();
  const { community_name, post_id, post_title } = useParams<{
    community_name: string;
    post_id: string;
    post_title: string;
  }>();

  const { posts, users, comments, communities, postVotes } = useTypedSelector(
    (state) => state.entities
  );
  const { item, isFetching } = useTypedSelector(
    (state) => state.postDiscussion
  );
  const commentsByPost = useTypedSelector((state) => state.commentsByPost);
  const session = useTypedSelector((state) => state.auth.session);

  useEffect(() => {
    dispatch(readPostAction(Number(post_id), community_name, post_title));
  }, [dispatch, post_id, community_name, post_title]);

  if (isFetching || !item) {
    return <span>Loading</span>;
  }

  const post = posts.byId[item];
  const community = communities.byId[post.community_id];
  const user = users.byId[post.author_id];
  const commentIds = commentsByPost[post.id].items;
  const numOfComments = commentIds.length;
  const sumOfVotes = Object.values(postVotes.byPostId[post.id]).reduce(
    (acc, curr) => {
      acc += curr.vote;
      return acc;
    },
    0
  );
  const postVote =
    postVotes.byPostId[post.id] && session
      ? postVotes.byPostId[post.id][session.id]
      : undefined;
  const nestedComments = nestComments(
    commentsByPost[post.id].items.map((commentId) => {
      const comment = comments.byId[commentId];

      return comment;
    })
  );

  const nestedCommentsElement = nestedComments.length ? (
    nestedComments.map((c) => {
      return (
        <Comment
          key={c.id}
          id={c.id}
          postId={Number(post_id)}
          body={c.body}
          createdAt={c.created_at}
          authorId={c.author_id}
          parentId={c.parent_id}
          children={c.children}
        />
      );
    })
  ) : (
    <NoComments />
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <PostCard
          id={post.id}
          title={post.title}
          community={community.name}
          username={user.username}
          body={post.body}
          createdAt={post.created_at}
          numOfComments={numOfComments}
          sumOfVotes={sumOfVotes}
          postVote={postVote}
        />
        <CommentEditor
          postId={Number(post_id)}
          cb={() => console.log("Comment created")}
        />
        <div className={styles.comments}>{nestedCommentsElement}</div>
      </div>
    </div>
  );
};
