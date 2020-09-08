import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./CreatePost.module.css";
import { readCommunitiesAction } from "../../redux/community/actions";

export const CreatePost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readCommunitiesAction());
  }, [dispatch]);

  return (
    <div>
      <span>Create Post</span>
    </div>
  );
};
