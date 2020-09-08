import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";
import { Button } from "../../../Button";
import { showModal } from "../../../../redux/modal/actions";
import { useTypedSelector } from "../../../../redux/hooks";
import { logoutAction } from "../../../../redux/auth/actions";
import { AiTwotoneEdit } from "react-icons/ai";

export const NavBar = () => {
  const dispatch = useDispatch();

  const { session, isAuthenticated } = useTypedSelector((state) => state.auth);

  let navContent;

  if (isAuthenticated) {
    navContent = (
      <>
        <li className={styles.list_item}>
          <Link to="/create" className={styles.icon_link}>
            <AiTwotoneEdit />
          </Link>
        </li>
        <li className={styles.list_item}>
          <Button onClick={() => dispatch(logoutAction())}>Log Out</Button>
        </li>
      </>
    );
  } else {
    navContent = (
      <>
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
      </>
    );
  }

  return (
    <nav className={styles.nav_bar}>
      <ul className={styles.list}>{navContent}</ul>
    </nav>
  );
};
