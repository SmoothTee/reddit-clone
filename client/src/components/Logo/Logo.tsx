import React from "react";
import { Link } from "react-router-dom";

import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo_link}>
      <span className={styles.logo_text}>Reddit Clone</span>
    </Link>
  );
};
