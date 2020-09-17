import React from "react";
import { renderNTimes } from "../../utils/renderNTimes";
import { LineSkeleton } from "../LineSkeleton";
import { SquareSkeleton } from "../SquareSkeleton";

import styles from "./CommunityCardSkeleton.module.css";

export const CommunityCardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>{renderNTimes(<LineSkeleton />, 2)}</div>
      <SquareSkeleton size="2rem" />
    </div>
  );
};
