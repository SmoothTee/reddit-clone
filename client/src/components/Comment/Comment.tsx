import React from "react";
import moment from "moment";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { Link } from "react-router-dom";

import styles from "./Comment.module.css";
import { MdChatBubble } from "react-icons/md";
import { CommentVote, PostComment } from "../../redux/comment/types";
import { useTypedSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { voteCommentAction } from "../../redux/comment/actions";

interface CommentProps {
  id: number;
  authorId: number;
  createdAt: string;
  body: string;
  parentId?: number;
  children?: PostComment[];
  commentVote?: CommentVote;
}

export const Comment = ({
  id,
  authorId,
  createdAt,
  body,
  parentId,
  children,
}: CommentProps) => {
  const dispatch = useDispatch();

  const { users, commentVotes } = useTypedSelector((state) => state.entities);
  const session = useTypedSelector((state) => state.auth.session);

  const { username } = users.byId[authorId];

  const nestedComments = (children || []).map((c) => {
    return (
      <Comment
        id={c.id}
        key={c.id}
        authorId={c.author_id}
        createdAt={c.created_at}
        body={c.body}
        parentId={c.parent_id}
        children={c.children}
      />
    );
  });

  const commentVote =
    commentVotes.byCommentId[id] && session
      ? commentVotes.byCommentId[id][session.id]
      : undefined;
  const votes = commentVotes.byCommentId[id]
    ? Object.values(commentVotes.byCommentId[id]).reduce((acc, curr) => {
        acc += curr.vote;
        return acc;
      }, 0)
    : undefined;

  return (
    <div className={`${styles.container} ${parentId ? styles.no_padding : ""}`}>
      <div className={styles.sidebar}>
        <div className={styles.arrows}>
          <button
            className={`${styles.vote_button} ${
              commentVote?.vote === 1 ? styles.red : ""
            }`}
            onClick={() =>
              dispatch(voteCommentAction({ comment_id: id, vote: 1 }))
            }
          >
            <ImArrowUp />
          </button>
          <button
            className={`${styles.vote_button} ${
              commentVote?.vote === -1 ? styles.blue : ""
            }`}
            onClick={() =>
              dispatch(voteCommentAction({ comment_id: id, vote: -1 }))
            }
          >
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
          <span className={styles.votes}>
            {votes} point{votes !== 1 && votes !== -1 ? "s" : ""}
          </span>
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
