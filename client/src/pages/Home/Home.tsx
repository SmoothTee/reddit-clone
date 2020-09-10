import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./Home.module.css";
import { readPostsAction } from "../../redux/post/actions";
import { useTypedSelector } from "../../redux/hooks";
import { PostCard } from "../../components/PostCard";

export const Home = () => {
  const dispatch = useDispatch();

  const session = useTypedSelector((state) => state.auth.session);
  const { items, isFetching } = useTypedSelector((state) => state.homePosts);
  const { posts, users, communities, postVotes } = useTypedSelector(
    (state) => state.entities
  );

  useEffect(() => {
    dispatch(readPostsAction());
  }, [dispatch]);

  if (isFetching && items.length === 0) {
    return <span>Loading</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {items.map((pId) => {
          const post = posts.byId[pId];
          const sumOfVotes = postVotes.byPostId[pId]
            ? Object.values(postVotes.byPostId[pId]).reduce((acc, curr) => {
                acc += curr.vote;
                return acc;
              }, 0)
            : 0;
          const community = communities.byId[post.community_id];
          const username = users.byId[post.author_id].username;
          const postVote =
            postVotes.byPostId[pId] && session
              ? postVotes.byPostId[pId][session.id]
              : undefined;

          return (
            <PostCard
              key={post.id}
              id={post.id}
              postVote={postVote}
              sumOfVotes={sumOfVotes}
              community={community.name}
              username={username}
              createdAt={post.created_at}
              title={post.title}
              numOfComments={post.numOfComments}
            />
          );
        })}
      </div>
      <aside className={styles.sidebar}>
        <div className={styles.box}>
          <span className={styles.box_header}>Communities</span>
        </div>
      </aside>
    </div>
  );
};
