import React from "react";
import { IoMdChatbubbles } from "react-icons/io";

import styles from "./NoComments.module.css";

export const NoComments = () => {
  return (
    <div className={styles.container}>
      <IoMdChatbubbles className={styles.icon} />
      <span className={styles.title}>No Comments Yet</span>
      <span className={styles.description}>
        Be the first to share what you think!
      </span>
    </div>
  );
};
