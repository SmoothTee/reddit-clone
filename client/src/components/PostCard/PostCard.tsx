import React from "react";
import moment from "moment";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { useDispatch } from "react-redux";

import styles from "./PostCard.module.css";
import { Link } from "react-router-dom";
import { MdChatBubble } from "react-icons/md";
import { PostVote } from "../../redux/post/types";
import { votePostAction } from "../../redux/post/actions";

interface PostCardProps {
  id: number;
  sumOfVotes: number;
  community: string;
  username: string;
  createdAt: string;
  title: string;
  numOfComments: number;
  body?: string;
  postVote?: PostVote;
}

export const PostCard = ({
  id,
  sumOfVotes,
  community,
  username,
  createdAt,
  title,
  body,
  numOfComments,
  postVote,
}: PostCardProps) => {
  const dispatch = useDispatch();

  const vote = postVote ? postVote.vote : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.votes}>
          <button
            className={`${styles.vote_button} ${vote === 1 ? styles.red : ""}`}
            onClick={() => dispatch(votePostAction({ post_id: id, vote: 1 }))}
          >
            <ImArrowUp />
          </button>
          <span
            className={`${styles.sum_votes} ${
              vote === 1 ? styles.red : vote === -1 ? styles.blue : ""
            }`}
          >
            {sumOfVotes}
          </span>
          <button
            className={`${styles.vote_button} ${
              vote === -1 ? styles.blue : ""
            }`}
            onClick={() => dispatch(votePostAction({ post_id: id, vote: -1 }))}
          >
            <ImArrowDown />
          </button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <Link to={`/r/${community}`} className={styles.community}>
            /r/{community}
          </Link>
          <span className={styles.author}>
            Posted by{" "}
            <Link to={`/u/${username}`} className={styles.author_link}>
              /u/{username}
            </Link>
          </span>
          <span className={styles.created_at}>
            {moment(createdAt).fromNow()}
          </span>
        </div>
        <div className={styles.center}>
          <span className={styles.title}>{title}</span>
          <span
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: body ? body : "" }}
          />
        </div>
        <div className={styles.footer}>
          <button className={styles.footer_button}>
            <MdChatBubble />
            <span className={styles.button_text}>
              {numOfComments} comment{numOfComments !== 1 ? "s" : ""}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
