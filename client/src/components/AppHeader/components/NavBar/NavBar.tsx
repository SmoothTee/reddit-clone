import React from "react";
import { useDispatch } from "react-redux";

import styles from "./NavBar.module.css";
import { Button } from "../../../Button";
import { showModal } from "../../../../redux/modal/actions";

export const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <nav className={styles.nav_bar}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Button onClick={() => dispatch(showModal("LoginModal"))}>
            Log In
          </Button>
        </li>
        <li className={styles.list_item}>
          <Button onClick={() => dispatch(showModal("RegisterModal"))}>
            Sign Up
          </Button>
        </li>
      </ul>
    </nav>
  );
};
