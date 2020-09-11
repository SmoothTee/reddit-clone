import React from "react";
import moment from "moment";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { Link } from "react-router-dom";

import styles from "./Comment.module.css";
import { MdChatBubble } from "react-icons/md";
import { PostComment } from "../../redux/comment/types";
import { useTypedSelector } from "../../redux/hooks";

interface CommentProps {
  authorId: number;
  createdAt: string;
  body: string;
  depth: number;
  children?: PostComment[];
}

export const Comment = ({
  authorId,
  createdAt,
  body,
  depth,
  children,
}: CommentProps) => {
  const { users } = useTypedSelector((state) => state.entities);

  const { username } = users.byId[authorId];

  const nestedComments = (children || []).map((c) => {
    return (
      <Comment
        key={c.id}
        authorId={c.author_id}
        createdAt={c.created_at}
        body={c.body}
        depth={c.depth}
        children={c.children}
      />
    );
  });

  return (
    <div
      className={`${styles.container} ${depth !== 1 ? styles.no_padding : ""}`}
    >
      <div className={styles.sidebar}>
        <div className={styles.arrows}>
          <button className={styles.vote_button}>
            <ImArrowUp />
          </button>
          <button className={styles.vote_button}>
            <ImArrowDown />
          </button>
        </div>
        <div className={styles.vertical_line} />
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <Link to={`/u/${username}`} className={styles.username}>
            {username}
          </Link>
          <span className={styles.votes}>6 points</span>
          <span className={styles.time}>{moment(createdAt).fromNow()}</span>
        </div>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className={styles.footer}>
          <button className={styles.footer_button}>
            <MdChatBubble />
            <span className={styles.button_text}>Reply</span>
          </button>
        </div>
        {nestedComments}
      </div>
    </div>
  );
};
