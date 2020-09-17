import React from "react";
import { Link } from "react-router-dom";
import { GiBatMask } from "react-icons/gi";

import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link to="/" className={styles.link}>
      <GiBatMask className={styles.icon} />
      <span className={styles.text}>Dreadit</span>
    </Link>
  );
};
