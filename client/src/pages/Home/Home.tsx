import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./Home.module.css";
import { readPostsAction } from "../../redux/post/actions";
import { useTypedSelector } from "../../redux/hooks";
import { PostCard } from "../../components/PostCard";

export const Home = () => {
  const dispatch = useDispatch();

  const { items, isFetching } = useTypedSelector((state) => state.homePosts);
  const { posts, users, communities, postVotes } = useTypedSelector(
    (state) => state.entities
  );

  useEffect(() => {
    dispatch(readPostsAction());
  }, [dispatch]);

  if (isFetching && items.length > 0) {
    return <span>Loading</span>;
  }

  return (
    <div>
      {items.map((pId) => {
        const post = posts.byId[pId];
        const numOfVotes = postVotes.byPostId[pId]
          ? Object.keys(postVotes.byPostId[pId]).length
          : 0;
        const community = communities.byId[post.community_id]
          ? communities.byId[post.community_id]
          : { name: "" };
        const username = users.byId[post.author_id].username;

        return (
          <PostCard
            key={post.id}
            numOfVotes={numOfVotes}
            community={community.name}
            username={username}
            createdAt={post.created_at}
            title={post.title}
            numOfComments={post.numOfComments}
          />
        );
      })}
    </div>
  );
};
