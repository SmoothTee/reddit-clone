import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./PostDiscussion.module.css";
import { readPostAction } from "../../redux/post/actions";
import { PostCard } from "../../components/PostCard";
import { useTypedSelector } from "../../redux/hooks";

export const PostDiscussion = () => {
  const dispatch = useDispatch();
  const { community_name, post_id, post_title } = useParams();

  const { posts, users, comments, communities, postVotes } = useTypedSelector(
    (state) => state.entities
  );
  const { item, isFetching } = useTypedSelector(
    (state) => state.postDiscussion
  );
  const commentsByPost = useTypedSelector((state) => state.commentsByPost);

  useEffect(() => {
    dispatch(readPostAction(post_id, community_name, post_title));
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <PostCard
          id={post.id}
          title={post.title}
          community={community.name}
          username={user.username}
          createdAt={post.created_at}
          numOfComments={numOfComments}
          sumOfVotes={sumOfVotes}
        />
        <div className={styles.comments}>
          <span>Comment</span>
        </div>
      </div>
    </div>
  );
};
