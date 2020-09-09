import React from "react";
import moment from "moment";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

import styles from "./PostCard.module.css";
import { Link } from "react-router-dom";
import { MdChatBubble } from "react-icons/md";

interface PostCardProps {
  numOfVotes: number;
  community: string;
  username: string;
  createdAt: string;
  title: string;
  numOfComments: number;
  body?: string;
}

export const PostCard = ({
  numOfVotes,
  community,
  username,
  createdAt,
  title,
  body,
  numOfComments,
}: PostCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.votes}>
          <button className={styles.vote_button}>
            <ImArrowUp />
          </button>
          <span className={styles.sum_votes}>{numOfVotes}</span>
          <button className={styles.vote_button}>
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
          <span className={styles.body}>{body}</span>
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
