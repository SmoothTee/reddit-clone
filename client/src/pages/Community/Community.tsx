import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard } from "../../components/PostCard";
import { PostCardSkeleton } from "../../components/PostCardSkeleton";
import { useTypedSelector } from "../../redux/hooks";
import { readPostsAction } from "../../redux/post/actions";
import { renderNTimes } from "../../utils/renderNTimes";

import styles from "./Community.module.css";

export const Community = () => {
  const dispatch = useDispatch();
  const { community_name } = useParams<{ community_name: string }>();

  const postsByCommunity = useTypedSelector((state) => state.postsByCommunity);
  const { posts, communities, postVotes, users } = useTypedSelector(
    (state) => state.entities
  );
  const session = useTypedSelector((state) => state.auth.session);

  useEffect(() => {
    dispatch(readPostsAction(community_name));
  }, [dispatch, community_name]);

  const postIds = postsByCommunity[community_name];

  let postFeed;

  if (
    !postsByCommunity[community_name] ||
    postsByCommunity[community_name].isFetching
  ) {
    postFeed = renderNTimes(<PostCardSkeleton />);
  } else {
    postFeed = postIds.items.map((pId) => {
      const post = posts.byId[pId];
      const community = communities.byId[post.community_id];
      const sumOfVotes = postVotes.byPostId[pId]
        ? Object.values(postVotes.byPostId[pId]).reduce((acc, curr) => {
            acc += curr.vote;
            return acc;
          }, 0)
        : 0;
      const user = users.byId[post.author_id];
      const postVote =
        postVotes.byPostId[pId] && session
          ? postVotes.byPostId[pId][session.id]
          : undefined;

      return (
        <PostCard
          key={post.id}
          id={post.id}
          community={community.name}
          createdAt={post.created_at}
          body={post.body}
          numOfComments={post.numOfComments}
          sumOfVotes={sumOfVotes}
          title={post.title}
          username={user.username}
          postVote={postVote}
        />
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>{postFeed}</div>
    </div>
  );
};
