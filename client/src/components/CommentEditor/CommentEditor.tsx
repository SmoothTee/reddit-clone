import React, { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../redux/comment/actions";
import { useTypedSelector } from "../../redux/hooks";
import { showModal } from "../../redux/modal/actions";
import { Button } from "../Button";

import styles from "./CommentEditor.module.css";

interface CommentEditorProps {
  postId: number;
  parentId?: number;
  cb: () => void;
}

export const CommentEditor = ({ postId, parentId, cb }: CommentEditorProps) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const isAuthenticated = useTypedSelector(
    (state) => state.auth.isAuthenticated
  );

  const callback = () => {
    cb();
    setBody("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      createCommentAction(
        { parent_id: parentId, post_id: postId, body },
        callback
      )
    );
  };

  if (isAuthenticated) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <ReactQuill theme="snow" value={body} onChange={setBody} />
        <Button disabled={!body.length}>Create Comment</Button>
      </form>
    );
  } else {
    return (
      <div className={styles.container}>
        <span className={styles.text}>
          Log in or Register to leave a comment.
        </span>
        <div className={styles.buttons}>
          <Button onClick={() => dispatch(showModal("LoginModal"))}>
            Log In
          </Button>
          <Button onClick={() => dispatch(showModal("RegisterModal"))}>
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
};
