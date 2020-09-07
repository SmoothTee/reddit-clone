import React from "react";

import styles from "./AppHeader.module.css";
import { Logo } from "../Logo";
import { NavBar } from "./components/NavBar";

export const AppHeader = () => {
  return (
    <header className={styles.app_header}>
      <Logo />
      <NavBar />
    </header>
  );
};
