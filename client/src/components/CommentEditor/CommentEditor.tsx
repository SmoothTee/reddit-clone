import React, { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../redux/comment/actions";
import { Button } from "../Button";

import styles from "./CommentEditor.module.css";

interface CommentEditorProps {
  postId: number;
}

export const CommentEditor = ({ postId }: CommentEditorProps) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(createCommentAction({ post_id: postId, body }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ReactQuill theme="snow" value={body} onChange={setBody} />
      <Button disabled={!body.length}>Create Comment</Button>
    </form>
  );
};
