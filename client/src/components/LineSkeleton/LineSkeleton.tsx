import React from "react";

import styles from "./LineSkeleton.module.css";

interface LineSkeletonProps {
  size?: "s" | "m" | "l";
}

export const LineSkeleton = ({ size = "l" }: LineSkeletonProps) => {
  return (
    <div
      className={styles.line}
      style={{
        width: size === "s" ? "10rem" : size === "m" ? "20rem" : "100%",
      }}
    />
  );
};
