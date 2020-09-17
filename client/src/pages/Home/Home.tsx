import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./Home.module.css";
import { readPostsAction } from "../../redux/post/actions";
import { useTypedSelector } from "../../redux/hooks";
import { PostCard } from "../../components/PostCard";
import { CommunityCard } from "../../components/CommunityCard";
import { readCommunitiesAction } from "../../redux/community/actions";
import { PostCardSkeleton } from "../../components/PostCardSkeleton";
import { renderNTimes } from "../../utils/renderNTimes";
import { CommunityCardSkeleton } from "../../components/CommunityCardSkeleton";

export const Home = () => {
  const dispatch = useDispatch();

  const session = useTypedSelector((state) => state.auth.session);
  const { items: postItems, isFetching: isPostFetching } = useTypedSelector(
    (state) => state.homePosts
  );
  const { posts, users, communities, postVotes } = useTypedSelector(
    (state) => state.entities
  );
  const {
    isFetching: isCommunityFetching,
    items: communityItems,
  } = useTypedSelector((state) => state.community);
  const memberCommunity = useTypedSelector(
    (state) => state.memberCommunity.items
  );

  const filteredCommunityItems = communityItems.filter(
    (cId) => !memberCommunity.includes(cId)
  );

  useEffect(() => {
    dispatch(readPostsAction());
    dispatch(readCommunitiesAction(true));
  }, [dispatch]);

  let postFeed;
  let communityFeed;

  if (isPostFetching && isCommunityFetching) {
    postFeed = renderNTimes(<PostCardSkeleton />);

    communityFeed = renderNTimes(<CommunityCardSkeleton />);
  } else {
    postFeed = postItems.map((pId) => {
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
          body={post.body}
          username={username}
          createdAt={post.created_at}
          title={post.title}
          numOfComments={post.numOfComments}
        />
      );
    });

    communityFeed = filteredCommunityItems.length ? (
      filteredCommunityItems.map((cId) => {
        const community = communities.byId[cId];

        return (
          <CommunityCard
            key={community.id}
            id={community.id}
            name={community.name}
            numOfMembers={community.numOfMembers}
          />
        );
      })
    ) : (
      <span className={styles.community_text}>
        You have already joined all communities.
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>{postFeed}</div>
      <aside className={styles.sidebar}>
        <div className={styles.box}>
          <span className={styles.box_header}>Communities</span>
          {communityFeed}
        </div>
      </aside>
    </div>
  );
};
