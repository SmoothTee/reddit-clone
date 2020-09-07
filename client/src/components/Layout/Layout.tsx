import React, { ReactNode } from "react";

import styles from "./Layout.module.css";
import { AppHeader } from "../AppHeader";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
