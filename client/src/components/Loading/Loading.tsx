import React from "react";

import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
    </div>
  );
};
