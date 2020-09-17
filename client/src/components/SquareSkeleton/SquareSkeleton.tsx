import React from "react";

import styles from "./SquareSkeleton.module.css";

interface SquareSkeletonProps {
  size?: string;
}

export const SquareSkeleton = ({ size = "1rem" }: SquareSkeletonProps) => {
  return (
    <div className={styles.square} style={{ height: size, width: size }} />
  );
};
