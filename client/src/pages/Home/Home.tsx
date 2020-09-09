import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./Home.module.css";
import { readPostsAction } from "../../redux/post/actions";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPostsAction());
  }, []);

  return (
    <div>
      <span>Home</span>
    </div>
  );
};
