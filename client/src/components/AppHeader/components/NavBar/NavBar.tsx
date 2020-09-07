import React from "react";

import styles from "./NavBar.module.css";
import { Button } from "../../../Button";

export const NavBar = () => {
  return (
    <nav className={styles.nav_bar}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Button>Log In</Button>
        </li>
        <li className={styles.list_item}>
          <Button>Sign Up</Button>
        </li>
      </ul>
    </nav>
  );
};
