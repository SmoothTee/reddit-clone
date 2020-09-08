import React, { HTMLProps } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "submit";
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
