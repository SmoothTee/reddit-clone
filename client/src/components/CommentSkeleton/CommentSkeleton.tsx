import React from "react";
import { renderNTimes } from "../../utils/renderNTimes";
import { LineSkeleton } from "../LineSkeleton";
import { SquareSkeleton } from "../SquareSkeleton";

import styles from "./CommentSkeleton.module.css";

export const CommentSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.arrows}>
          {renderNTimes(<SquareSkeleton />, 2)}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          {renderNTimes(<LineSkeleton size="s" />, 3)}
        </div>
        <div className={styles.text}>{renderNTimes(<LineSkeleton />)}</div>
        <div className={styles.footer}>
          {renderNTimes(<LineSkeleton size="s" />, 1)}
        </div>
      </div>
    </div>
  );
};
